(function (angular) {
    "use strict";
    angular.module('entity.directive.editableMultiselect', [])
        .directive('editableMultiselect', ['EditBox', '$log', function (EditBox, $log) {
            return {
                restrict: 'E',
                templateUrl: MapasCulturais.templateUrl.editableMultiselect,
                scope: {
                    entityProperty: '@',
                    emptyLabel: '@',
                    boxTitle: '@',
                },
                link: function ($scope, el, attrs) {
                    var def = MapasCulturais.entity.definition[attrs.entityProperty];
                    var entity = MapasCulturais.entity.object;
                    var originalValue = MapasCulturais.entity.object;
                    
                    function resetValues(){
                        if(entity[$scope.entityProperty]){
                            $scope.values = entity[$scope.entityProperty].split(';');
                        }else{
                            entity[$scope.entityProperty] = '';
                            $scope.values = [];
                        }
                    }
                    
                    $scope.inputVal = entity[$scope.entityProperty];
                    
                    $scope.editBox = EditBox;
                    
                    $scope.terms = Object.keys(def.options);
                    $scope.allowOther = def.allowOther;
                    $scope.allowOtherText = def.allowOtherText;

//                    $scope.boxTitle = ;

                    $log.log($scope.title);

                    $scope.editBoxId = 'editable-multiselect-' + $scope.entityProperty;
                    
                    resetValues();
                    
                    $scope.submit = function(){
                        entity[$scope.entityProperty] = $scope.values.join(';');
                        $scope.inputVal = entity[$scope.entityProperty];
                        var $input = jQuery('#' + $scope.entityProperty);
                        $input.editable('setValue', $scope.inputVal);
                        EditBox.close($scope.editBoxId);
                    };
                    
                    $scope.cancel = function(){
                        resetValues();
                    };
                    
                    $scope.valuesText = function(){
                        if(entity[$scope.entityProperty]){
                            return entity[$scope.entityProperty].split(';').join('; ');
                        }else{
                            return $scope.emptyLabel;
                        }
                    }
                }
            };
        }]);
})(angular);