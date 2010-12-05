#http://www.google.com/calendar/feeds/6bkqn7r85goj12qe3ps1e2nlug%40group.calendar.google.com/public/basic
#Calendar ID: 6bkqn7r85goj12qe3ps1e2nlug@group.calendar.google.com

require 'date'
require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'sinatra'
require 'json'

class Entry
	attr_accessor :title, :eventWhen

	def initialize(title, eventWhen)
		@title = title
		@eventWhen = eventWhen
	end

	def to_s
		@title + ":" + @eventWhen.to_s
	end
end

get '/jeansdays.json' do
	content_type :json

doc = Nokogiri::XML(open("http://www.google.com/calendar/feeds/6bkqn7r85goj12qe3ps1e2nlug%40group.calendar.google.com/public/basic")).css("entry")

#	doc = Nokogiri::XML(open("test.xml")).css("entry")
	entries = []
	doc.each do |item|
		title = item.at_css("title").content
		content = item.at_css("summary").content.to_s
		contentStart = content.index('When: ') + 6
		contentEnd = content.index('<')
		theDate = content[contentStart,contentEnd - contentStart]
		theWhen = Date.parse(theDate)
		entry = Entry.new(title, theWhen)
		entries << entry
	end
	entries.sort! {|a,b| a.eventWhen.year() <=> b.eventWhen.year() }

	return entries.to_json
end
