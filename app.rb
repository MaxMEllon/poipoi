require 'sinatra'
require 'sinatra/reloader' if development?

require 'json'
require 'slim'
require 'sass'

set :root, File.dirname(__FILE__)
set :public, File.dirname(__FILE__) << '/public'

get '/' do
  slim :index
end

post '/upload' do
  if params[:file]
    date = Time.now.to_s.split[0]
    hour, min, sec = Time.now.to_s.split[1].to_s.split(':')
    time_stamp = date << '_' << hour << ':' << min << ':' << sec
    save_path = "./public/logs/#{time_stamp}.csv"
    File.open(save_path, 'wb') do |f|
      p params[:file][:tempfile]
      f.write params[:file][:tempfile].read
    end
  else
    return {response: 500}.to_json
  end
  {response: 200}.to_json
end

get '/logs' do
  files = []
  Dir.glob './public/logs/*' do |file|
    files.push({file: file.gsub!('./public/logs/', '')})
  end
  {response: 200, files: files}.to_json
end

get '/:filename' do
  name = params[:filename]
  @data = File.read("./public/logs/#{name}")
  p @data.gsub!("\n", "\\n")
  slim :graph
end
