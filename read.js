// Array to store news data
var newsData = [
    {
      title: "News 1",
      content: "Content of news 1."
    },
    {
      title: "News 2",
      content: "Content of news 2."
    },
    {
      title: "News 3",
      content: "Content of news 3."
    },
    {
      title: "News 4",
      content: "Content of news 4."
    },
    {
      title: "News 5",
      content: "Content of news 5."
    },
    {
      title: "News 6",
      content: "Content of news 6."
    }
  ];
  // Function to display news
function displayNews() {
    var newsList = document.getElementById("news-list");
    newsList.innerHTML = "";
  
    for (var i = 0; i < newsData.length; i++) {
      var news = newsData[i];
  
      var newsCard = document.createElement("div");
      newsCard.className = "news-card";
  
      var newsTitle = document.createElement("div");
      newsTitle.className = "news-title";
      newsTitle.textContent = news.title;
  
      var newsContent = document.createElement("div");
      newsContent.className = "news-content";
      newsContent.textContent = news.content;
  
      var showMoreBtn = document.createElement("button");
      showMoreBtn.className = "show-more-btn";
      showMoreBtn.textContent = "Show More";
      showMoreBtn.setAttribute("data-index", i);
  
      showMoreBtn.addEventListener("click", function() {
        var index = this.getAttribute("data-index");
        var contentElement = this.parentNode.querySelector(".news-content");
  
        if (contentElement.style.display === "none" || contentElement.style.display === "") {
          contentElement.style.display = "block";
          this.textContent = "Show Less";
        } else {
          contentElement.style.display = "none";
          this.textContent = "Show More";
        }
      });
  
      newsCard.appendChild(newsTitle);
      newsCard.appendChild(newsContent);
      newsCard.appendChild(showMoreBtn);
  
      newsList.appendChild(newsCard);
    }
  }

  
  // Function to search news
  function searchNews() {
    var searchInput = document.getElementById("search-input").value.toLowerCase();
    var filteredNews;
  
    if (searchInput.trim() === "") {
      filteredNews = newsData;
    } else {
      filteredNews = newsData.filter(function(news) {
        var newsTitle = news.title.toLowerCase();
        var newsContent = news.content.toLowerCase();
        return newsTitle.includes(searchInput) || newsContent.includes(searchInput);
      });
    }
  
    newsData = filteredNews;
    displayNews();
  }
  
  displayNews();
  
  var searchInputField = document.getElementById("search-input");
  searchInputField.addEventListener("input", searchNews);
  