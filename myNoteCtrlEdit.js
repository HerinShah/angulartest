app.controller("myNoteCtrlEdit", function($scope) {

    $scope.Name = 'bob';
    $scope.Update  = function()
    {
        alert();
        var request = $http({
            method: "post",
            url: "Update.php",
            data: {
                name: $scope.Name,
                Email: $scope.Email,
                Address: $scope.Address,
                UserName: $scope.UserName,
                Password: $scope.Password,
                profileimage: $scope.profileimage,
                id: $scope.id

                // pass: $scope.password
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            alert(data);
        });
    };
});
