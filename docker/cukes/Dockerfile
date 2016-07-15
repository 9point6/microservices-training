FROM ruby:2.2.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /tests
WORKDIR /tests
ADD ./cuke/Gemfile /tests/Gemfile
ADD ./cuke/Gemfile.lock /tests/Gemfile.lock
RUN bundle install
ADD ./cuke /tests

CMD [ "bundle", "exec", "cucumber" ]
