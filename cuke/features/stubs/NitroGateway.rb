module StubBase
  class NitroGateway
    include HTTParty
    base_uri 'localhost:3001'

    def initialize()
      @options = { query: {}}
    end

    def asset(pid)
      self.class.get("/asset/#{pid}", @options)
    end
  end
  initialize_class(NitroGateway)
end
