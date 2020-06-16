console.log("angular");

const app = angular.module('MyApp', []);



app.controller('MyController', ['$http', '$timeout', function($http, $timeout) {
  this.title = '';
  this.url = '';
  this.responseData;
  this.message;

  this.getBookmarks = () => {
    $http({
      method: 'GET',
      url: '/bookmarks'
    }).then((response) => {
      this.responseData = response.data;
      console.log(this.responseData);
    },(error) => {
      console.log('error');
    });
  }

  this.deleteBookmark = title => {
    console.log(title)
    $http({
        method:'POST',
        url: '/bookmarks/delete',
        data: {item: title}
    }).then((response) => {
            this.getBookmarks();
        },(error) => {
          console.log(error);
        }
    );
}

  this.createBookmark = () => {
    $http({
      method: 'POST',
      url: '/bookmarks',
      data: {
        title: this.title,
        url: this.url
      }
    }).then((response) => {
      this.getBookmarks();
      this.showMessage(response.data.return);
      console.log(response);
    },(error) => {
      console.log('error');
    });
  }


  this.getBookmarks();


  this.showMessage = (responseMessage) => {
    console.log("this.showMessage")
    console.log(responseMessage)
    if (responseMessage === "post") {
      this.message = "Bookmark has been created!"
      console.log("The bookmark has been created!")
      $timeout(() => {
        console.log("timeout");
        this.message = "";
      }, 5000);
    } else {
      this.message = "Bookmark has been modified!"
      $timeout(() => {
        console.log("timeout");
        this.message = "";
      }, 5000);
      console.log("The bookmark has been modified!")
    }
  };

  // console.log(this.responseData)
}]);