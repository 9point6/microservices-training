module StubHelpers
  def class_name_to_lowercase(class_name)
    class_name.to_s.partition('::').last.gsub(/([a-z])([A-Z])/, '\1_\2').downcase
  end

  def initialize_class(class_name, caller_method = nil)
    caller_method ||= class_name_to_lowercase(class_name)
    class_eval %([def #{caller_method}
                    @_#{caller_method} ||= #{class_name}.new
                  end])
  end
end
module StubBase
  extend StubHelpers
  include StubHelpers
end
World(StubBase)
