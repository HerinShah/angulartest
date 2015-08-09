app.controller("myNoteCtrl", ['$scope','$http', '$anchorScroll',
        function($scope,$http, $anchorScroll) {
    $scope.message = "";
    $scope.id = 0;
    $scope.left  = function() {return 100 - $scope.message.length;};
    $scope.clear = function() {
        $scope.Name = "";
        $scope.Email= "",
        $scope.Address= "";
        $scope.UserName= "";
        $scope.Password= "";
        $scope.id = 0;
        $scope.path = "";
    };

    /*By default generated first random user*/
    $http.get('http://api.randomuser.me').success(function(data){
        $scope.Name = data.results[0].user.name.first + ' ' + data.results[0].user.name.last;
        $scope.Email = data.results[0].user.email;
        $scope.Address= data.results[0].user.location.street;
        $scope.UserName= data.results[0].user.username;
        $scope.Password= data.results[0].user.password;
        $scope.path= data.results[0].user.picture.medium;
        $scope.id = 0;
    });


    /*This function is used to generate random users using randomuser.me api*/
    $scope.random  = function()
    {
        $http.get('http://api.randomuser.me').success(function(data){
            $scope.Name = data.results[0].user.name.first + ' ' + data.results[0].user.name.last;
            $scope.Email = data.results[0].user.email;
            $scope.Address= data.results[0].user.location.street;
            $scope.UserName= data.results[0].user.username;
            $scope.Password= data.results[0].user.password;
            $scope.path= data.results[0].user.picture.medium;
            $scope.id = 0;
        });
    };

    /*This function is for save the profile information  to the database.If we are going to update then it update the information to the database*/


    $scope.save  = function()
    {
        var idd = 0;
        if ($scope.user_form.$valid) {
        if($scope.id == 0){
            idd = '';
        } else {
            idd = $scope.id;
        }
        $http({
            method: 'POST',
            url: 'check.php',
            headers: {
                'Content-Type': undefined
            },
            data: {

                'upload': $scope.file,
                name: $scope.Name,
                Email: $scope.Email,
                Address: $scope.Address,
                UserName: $scope.UserName,
                Password: $scope.Password,
                path: $scope.path,
                id: idd
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });


                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
            }
        })
            .success(function (data) {
                $scope.Name = "";
                $scope.Email= "";
                    $scope.Address= "";
                $scope.UserName= "";
                $scope.Password= "";
                $scope.id = 0;
                $scope.path="";
                alert(data.answer);
                $http.get("profileinfo.php")
                    .success(function (response) {$scope.info = response.resp;});
            })
            .error(function (data, status) {

            });
        } else {
            return false;
        }

    };
    /*This function for view the profile information*/
    /*$scope.view  = function()
    {*/

        $http.get("profileinfo.php")
            .success(function (response) {$scope.info = response.resp;});

    /*};*/
    /*This function for display the edit form.Means that it display the user profile information which you are selected for edit.*/
    $scope.Edit  = function(id)
    {


        var request = $http({
            method: "post",
            url: "update.php",
            data: {
                id: id


                // pass: $scope.password
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {

            for (var key in data.resp) {
                //alert(data);
                //var path = 'http://localhost/myapp/fileUpload/';
                console.log(data.resp[key]['name']);
                var obj = data.resp[key];
                $scope.Name = data.resp[key]['name'];
                $scope.Email = data.resp[key]['email'];
                $scope.Address = data.resp[key]['address'];
                $scope.UserName = data.resp[key]['username'];
                $scope.Password = data.resp[key]['password'];
                $scope.profileimage = data.resp[key]['profileoic'];
                $scope.id = data.resp[key]['user_id'];
                $scope.path = data.resp[key]['profileoic'];

            }
            $anchorScroll();

        });



    };


}]);






/*app.controller("myNoteCtrl",['$scope', 'fileUpload', function($scope, fileUpload) {
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is '+ JSON.stringify(file) );

        var uploadUrl = 'http://localhost/myapp/fileUpload';
        console.log(uploadUrl );
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

}]);*/
