require 'rubygems'
require 'sinatra'
require 'nokogiri'
require 'open-uri'
require 'json'
require 'date'

get '/' do
	redirect '/index.html'
end

get '/jeansday.json' do
	content_type :json

	doc = Nokogiri::XML(open("http://www.google.com/calendar/feeds/6bkqn7r85goj12qe3ps1e2nlug%40group.calendar.google.com/public/basic")).css("entry")
	#doc = Nokogiri::XML(open("test.xml")).css("entry")

	entries = Hash.new
	doc.each do |item|
		title = item.at_css("title").content
		content = item.at_css("summary").content.to_s
		contentStart = content.index('When: ') + 6
		contentEnd = content.index('<')
		theDate = content[contentStart,contentEnd - contentStart]

		entries[Date.parse(theDate).to_s] = title
	end

	return entries.to_json
end
