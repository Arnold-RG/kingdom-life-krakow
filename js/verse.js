(function () {
  var verses = [
    { ref: "John 8:12", text: "I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.", note: "Jesus does not ask you to invent a light of your own. Follow Him, and the path becomes walkable." },
    { ref: "Psalm 27:1", text: "The Lord is my light and my salvation; whom shall I fear?", note: "Fear loses its voice when we remember who is actually keeping us." },
    { ref: "Matthew 11:28", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", note: "Church is not a performance. If you are tired, this invitation is for you." },
    { ref: "Proverbs 4:23", text: "Keep thy heart with all diligence; for out of it are the issues of life.", note: "What we protect on the inside will show up in our week. Guard the gates." },
    { ref: "Philippians 4:6-7", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.", note: "Bring the real list to God. Peace is not the absence of need; it is His nearness in the need." },
    { ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God.", note: "The promise is not that Kraków will always feel easy. The promise is that you are not alone in it." },
    { ref: "Romans 8:38-39", text: "For I am persuaded, that neither death, nor life... shall be able to separate us from the love of God, which is in Christ Jesus our Lord.", note: "Your geography can change. His hold on you does not." },
    { ref: "Joshua 1:9", text: "Be strong and of a good courage... for the Lord thy God is with thee whithersoever thou goest.", note: "A new city, a new language, a new Sunday — courage grows from His presence, not from our certainty." },
    { ref: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want.", note: "Shepherding is daily. He knows the next field even when we do not." },
    { ref: "Hebrews 10:24-25", text: "And let us consider one another to provoke unto love and to good works: not forsaking the assembling of ourselves together.", note: "Faith is personal, but it is not private. We need one another on Sundays and in the week." },
    { ref: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.", note: "If fear is loud today, it is not from Him. Ask Him for a sound mind and a loving heart." },
    { ref: "Micah 6:8", text: "What doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?", note: "A simple rule for an ordinary Tuesday in Nowa Huta." },
    { ref: "John 14:27", text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you.", note: "The world’s peace depends on circumstances. His peace can sit with you in the hotel lobby before service." },
    { ref: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path.", note: "A lamp is for the next step, not always the whole map. Read a little. Walk that." },
    { ref: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you.", note: "All means the visa worry, the exam, the loneliness, and the thing you have not said out loud." },
    { ref: "Galatians 6:9", text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.", note: "Harvest is a Kingdom Life word. Keep sowing kindness and prayer." },
    { ref: "Colossians 3:16", text: "Let the word of Christ dwell in you richly... singing with grace in your hearts to the Lord.", note: "This is why we worship in English together: so the Word can live among us, not only in private." },
    { ref: "James 1:5", text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally.", note: "Questions are welcome here. Ask God. Ask the pastor. Keep asking." },
    { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble.", note: "Present means now — not after you have cleaned up the trouble." },
    { ref: "Matthew 5:14", text: "Ye are the light of the world. A city that is set on an hill cannot be hid.", note: "Kraków does not need a hidden church. Live the light you have received." },
    { ref: "Romans 12:10", text: "Be kindly affectioned one to another with brotherly love.", note: "Fellowship after service is not extra. It is part of how God heals people." },
    { ref: "Ephesians 2:8-9", text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.", note: "You do not earn a seat on Sunday. Grace already opened the door." },
    { ref: "Psalm 34:8", text: "O taste and see that the Lord is good: blessed is the man that trusteth in him.", note: "Faith is not only an idea. Come, listen, and see." },
    { ref: "Isaiah 40:31", text: "But they that wait upon the Lord shall renew their strength.", note: "Waiting is not wasting when it is waiting on Him." },
    { ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", note: "The centre of our church is not a building. It is this love." },
    { ref: "1 Thessalonians 5:16-18", text: "Rejoice evermore. Pray without ceasing. In every thing give thanks.", note: "This is why we gather to pray at 6 pm: so the week does not swallow the conversation with God." },
    { ref: "Hebrews 12:2", text: "Looking unto Jesus the author and finisher of our faith.", note: "He started the work in you. He is not finished." },
    { ref: "Psalm 121:1-2", text: "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the Lord.", note: "The hills around Kraków are beautiful. Help still comes from the Lord." },
    { ref: "Acts 2:42", text: "And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.", note: "A simple church life: teaching, friendship, table, prayer." },
    { ref: "2 Corinthians 5:17", text: "Therefore if any man be in Christ, he is a new creature: old things are passed away.", note: "You can begin again in this city. Christ is in the business of new things." },
    { ref: "Revelation 21:5", text: "Behold, I make all things new.", note: "Hold this when Monday feels like the same old story." }
  ];

  function pick() {
    var day = Math.floor(Date.now() / 86400000);
    return verses[day % verses.length];
  }

  function render() {
    var v = pick();
    document.querySelectorAll("[data-verse-text]").forEach(function (el) { el.textContent = "“" + v.text + "”"; });
    document.querySelectorAll("[data-verse-ref]").forEach(function (el) { el.textContent = v.ref; });
    document.querySelectorAll("[data-verse-note]").forEach(function (el) { el.textContent = v.note; });
    var d = new Date();
    document.querySelectorAll("[data-verse-date]").forEach(function (el) {
      el.textContent = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
