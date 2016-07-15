Given(/^I get an asset with pid (.*)$/) do |pid|
  @response = nitro_gateway.asset(pid)
end

When(/^the pid exists$/) do
  expect(@response).not_to be_nil
end

Then(/^the response of the pid has the following attributes$/) do |table|
  puts @response
  expect(@response.keys).to match_array(table.raw.flatten)
  # puts @response.keys
  # puts table.raw.flatten
end
