require 'rubygems'
require 'bundler/setup'
require 'cucumber'
require 'rspec'
require 'rspec/expectations'
require 'httparty'
require 'require_all'

# ======= load common helpers =======
require_rel '/../stubs/*.rb'
