/* =============================================================================
* jquery.tracker.js
* ==============================================================================
* Copyright (c) 2013 Gregory Plüss <gpluess@fconnection.com>
* http://www.fconnection.com
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* =========================================================================== */

/*global _gaq:true*/
;(function ($) {
	'use strict';

	function extract(href) {
		return href.split('/').pop();
	}

	var track = function () {

		$('a').on('click', function (e) {
			var anchor = $(this),
				host = e.currentTarget.host,
				href = e.currentTarget.href,
				newtab = false;

			e.preventDefault();

			if (typeof _gaq === 'object') {
				if (host !== window.location.host) {
					_gaq.push(['_trackEvent', 'Outbound Link', host.split(':').shift(), href, 0]);
				} else if (href.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlt|rdf|zip|rar)$/)) {
					_gaq.push(['_trackEvent', 'Download Link', extract(href), href, 0]);
				} else if (href.match(/\.(avi|mov|wmv|flv|f4v|mp4|webm|ogv)$/)) {
					_gaq.push(['_trackEvent', 'Video Link', extract(href), href, 0]);
				} else if (href.match(/\.(mp3|wav|aac|wma)$/)) {
					_gaq.push(['_trackEvent', 'Audio Link', extract(href), href, 0]);
				} else if (href.match(/\.(jpg|jpeg|gif|png|tif|svg)$/)) {
					_gaq.push(['_trackEvent', 'Image Link', extract(href), href, 0]);
				} else {
					// do nothing
				}
			}

			// detect ctrl / cmd key
			if (e.metaKey || e.ctrlKey) {
				newtab = true;
			}

			if (newtab === false) {
				if (anchor.attr('target') === '_blank') {
					window.open(href);
				} else {
					setTimeout(function () {
						document.location = href;
					}, 100);
				}
			}

		});
	};

	$(track);

})(jQuery);
