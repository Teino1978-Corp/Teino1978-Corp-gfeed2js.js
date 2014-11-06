<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">
/*!--	Sample feedbox html -- 
	<div class="feeds">
		<p class="feed-title">
			<a href="url">title</a>
			description
			</p>
			<ul>
				<li> entry </li>
				<li> entry </li>
			</ul>
	</div>
--*/
	//initialize google feed api for displaying rss
	google.load("feeds", "1");

	function feed_init(furl, flen, fdiv) { //feed url, feed item length, div name
		var feed=new google.feeds.Feed(furl);
		feed.setNumEntries(flen);
		feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
		feed.includeHistoricalEntries();

		feed.load(function(result){
			if ( !result.error ) {
				//build the html
				var container=document.getElementById("feeds-wrapper");
				//clear feedbox if exists, or create it
				if (document.getElementById(fdiv)) {
					var feedBox=document.getElementById(fdiv);
					while (feedBox.firstChild){
						feedBox.removeChild(feedBox.firstChild);
					}
				}
				else {
					var feedBox=document.createElement("div");
					feedBox.setAttribute("id", fdiv);
					feedBox.setAttribute("class", "gfeeds");
				}

				/*var refBtn=document.createElement("img");
				refBtn.setAttribute("class", "refreshButton");
				refBtn.setAttribute("alt", "Click to refresh");
				refBtn.setAttribute("onclick", function(){feed_init(furl, flen, fdiv)});
				refBtn.setAttribute("src", "./images/icons/iconmonstr-refresh-3-icon.svg");*/

				//title
				var ftitle=document.createElement("p");
				ftitle.setAttribute("class", "title");

				//link
				var flink=document.createElement("a");
				flink.setAttribute("href", result.feed.link);
				flink.appendChild(document.createTextNode(result.feed.title));
				ftitle.appendChild(flink);
				ftitle.appendChild(document.createTextNode(result.feed.description));

				//entries ul
				var feedul=document.createElement("ul");
				//if (flen == "" || flen > result.feed.entries.length ) { flen = result.feed.entries.length;}
				//entries li
				for (var i=0; i<result.feed.entries.length; i++) {
					var entry=result.feed.entries[i];
					//make the html from the feed
					var li=document.createElement("li");
					//entry links
					var elink=document.createElement("a");
					elink.setAttribute("href", entry.link);
					elink.setAttribute("title", entry.contentSnippet);
					elink.appendChild(document.createTextNode(entry.title));

					li.appendChild(elink);
					feedul.appendChild(li);
				}
				//feedBox.appendChild(refBtn);
				feedBox.appendChild(ftitle);
				feedBox.appendChild(feedul);

				container.appendChild(feedBox);
			}
		//	else { alert("Error with feed: "+furl);}
		});
		//refresh every 5 mins
		var rf=setTimeout(function(){feed_init(furl, flen, fdiv)},300000);
	}
	//google.setOnLoadCallback(feed_init);
</script>
		
/*Usage
<div id="feeds-wrapper">
	<script> feed_init("https://open.live.bbc.co.uk/weather/feeds/en/1275004/3dayforecast.rss", 3, "weather");</script>
</div>*/