/*
 * FullCalendar v@VERSION Google Calendar Extension
 *
 * Copyright (c) 2010 Adam Shaw
 * Dual licensed under the MIT and GPL licenses, located in
 * MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
 *
 * Date: @DATE
 *
 */

(function($) {

	$.gcalFeed = function(feedUrl, options) {
		
		feedUrl = feedUrl.replace(/\/basic$/, '/full');
		options = options || {};
		
		return function(start, end, callback, errorCallback) {
			var params = {
				'start-min': start,
				'start-max': end,
				'singleevents': true,
				'max-results': 20
			};
			$.ajax({
				cache: false,
				url: feedUrl + "?alt=json-in-script&callback=?",
				data: params,
				dataType: 'json',
				success: function(data) { createEvents(data, callback);},
				error: function() { errorCallback(); },
			});
		}

		function createEvents(data, callback) {
			var events = [];
			if (data.feed.entry) {
				$.each(data.feed.entry, function(i, entry) {
					var startStr = entry['gd$when'][0]['startTime'],
						start = parseISO8601(startStr, true);
					events[start] = entry['title']['$t'];
				});
			}
			callback(events);
		}			
		
	}

})(jQuery);
