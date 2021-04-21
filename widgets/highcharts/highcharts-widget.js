class CustomHighchartsWidgetCtrl {
    constructor($rootScope, $timeout, $scope) {
        this.$rootScope = $rootScope
        this.$timeout = $timeout
        this.$scope = $scope
        this.build = function (data){          
            let d=[];
            for (let i=0;i<3;i++)
            for (let j=0;j<6;j++){
                d.push(data[i][j]);
            }
            var max=Math.round((1000000-d[0])/10000);
            for(let i=0;i<d.length;i++){
                if (max<=d[i])
                    max=d[i]
            }
            let percents=[];
            for(let i=0;i<d.length;i++){
                var scale=Math.round((1000000+max)/10000);
                var v=Math.round((1000000+d[i])/10000);
                var p=Math.round((v*100)/scale);
                        var o={value:v, percent: p, origin:d[i]};
                        percents.push(o);
            }
            var c=0;
            for (let i=0;i<3;i++)
            for (let j=0;j<6;j++)
            {
            var config = {
                container: document.getElementById('draw-'+i+'-'+j),
                radius: 220,
                maxOpacity: .5,
                minOpacity: 0,
                blur: .75,
                gradient: {
                    '.5': 'green',
                    '.8': 'blue',
                    '.95': 'hsl(0, 100%, '+(100-percents[c].percent)+'%)'
                  }
              };


         var heatmap = h337.create(config);
            var drawObj ={
               x: 50,
               y: 50,
                value: percents[c].value
            };
            heatmap.addData(drawObj);
            c++;
        }
        let leg=percents.sort(function(a,b){return b.value-a.value});
        c=0;
        for (let j=0;j<leg.length;j++)
        {
            document.getElementById('vcell-'+j).innerHTML=leg[c].origin;
        var config = {
            container: document.getElementById('cell-'+j),
            radius: 220,
            maxOpacity: .5,
            minOpacity: 0,
            blur: .75,
            gradient: {
                '.5': 'green',
                '.8': 'blue',
                '.95': 'hsl(0, 100%, '+(100-leg[c].percent)+'%)'
              }
          };
        var heatmap = h337.create(config);
        var drawObj ={
           x: 12,
           y: 25,
            value: leg[c].value
        };
        heatmap.addData(drawObj);
        c++;
    }

    }
    }

    

    $onInit() {
        this.columnHeaders = [["Version","Executive General and Administration","Inventory Management","Manufacturing","Quality Assurance","Sales and Marketing","Research and Development"]];
        this.rowsData = [["Actual",-214569.02804853008,-105928.24112864747,6825.64149834103,-4314.147215432423,866378.2837408222,-204590.33887112237],
                         ["Budget",-352171.14227059274,-98795.9712060611,238.1234837768164,238.1234837768164,1512416.8967751563,-202891.60255816544],
                         ["Last Year",-309116.6502055696,-124991.3211540927,7183.136080128785,-4540.101692374503,-525266.1946542066,-244072.0727683794]];
         var data = [[-214569.02804853008,-105928.24112864747,6825.64149834103,-4314.147215432423,866378.2837408222,-204590.33887112237],
                         [-352171.14227059274,-98795.9712060611,238.1234837768164,238.1234837768164,1512416.8967751563,-202891.60255816544],
                         [-309116.6502055696,-124991.3211540927,7183.136080128785,-4540.101692374503,-525266.1946542066,-244072.0727683794]];
        this.legend_data=[[-214569.02804853008,-105928.24112864747,6825.64149834103,-4314.147215432423,866378.2837408222,-204590.33887112237,-352171.14227059274,-98795.9712060611,238.1234837768164,238.1234837768164,1512416.8967751563,-202891.60255816544,-309116.6502055696,-124991.3211540927,7183.136080128785,-4540.101692374503,-525266.1946542066,-244072.0727683794]];
        this.build(data);
    }
}

CustomHighchartsWidgetCtrl.$inject = ['$rootScope', '$timeout', '$scope']

angular.module('DemoApp').component('customHighchartsWidget', {
    templateUrl: 'widgets/highcharts/highcharts-widget.html',
    controller: CustomHighchartsWidgetCtrl,
    bindings: {
    }
})