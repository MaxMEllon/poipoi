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
  return {response: 500, message: "Error: Wrong number of params."}.to_json unless params[:file]
  date = Time.now.to_s.split[0]
  hour, min, sec = Time.now.to_s.split[1].to_s.split(':')
  time_stamp = date << '_' << hour << ':' << min << ':' << sec
  save_path = "./public/logs/#{time_stamp}.csv"
  begin
    File.open(save_path, 'wb') { |f| f.write params[:file][:tempfile].read }
  rescue => e
    return {response: 500, message: "Error: #{e}"}.to_json
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
  @data.gsub!("\n", "\\n")
  slim :graph
end

get '/download/:filename' do
  name = params[:filename]
  File.read("./public/logs/#{name}")
end

