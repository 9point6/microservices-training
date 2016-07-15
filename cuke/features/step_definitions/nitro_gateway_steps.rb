Given(/^An asset with pid (.*) is being requested$/) do |pid|
  @response = nitro_gateway.asset(pid)
end

When(/^the pid (?:does not )?exists? in PIPS database$/) do
  expect(@response).not_to be_nil
end

Then(/^the response of the pid has the following attributes$/) do |table|
  expect(@response.keys).to match_array(table.raw.flatten)
end

Then(/^An error is thrown as not found$/) do
  expected_error = { 'error' => 'asset not found' }
  expect(@response.parsed_response).to match(expected_error)
  # expect(@response.keys[0]).to eql('error')
  # expect(@response[@response.keys.first]).to eql('asset not found')
end