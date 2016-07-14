Before do |scenario|
  @nitro = fork do
    exec( "npm run nitro" )
  end
  Process.detach(@nitro)
end

After do |scenario|
  Process.kill('TERM', @nitro)  
end
