class CustomHandsontableWidgetCtrl {
    constructor($rootScope, $timeout, $scope) {
        this.$rootScope = $rootScope
        this.$timeout = $timeout
        this.$scope = $scope        
        this.drawhandsone = function(data){

            for (let i=0;i<3;i++)
            for (let j=0;j<6;j++)
            {
            var config = {
                container: document.getElementById('c-'+i+'-'+j),
                radius: 220,
                maxOpacity: .5,
                minOpacity: 0,
                blur: .75,
                gradient: {
                    '.5': 'green',
                    '.8': 'blue',
                    '.95': 'hsl(0, 100%, 50%)'
                  }
              };
            var heatmap = h337.create(config);
            var drawObj ={
               x: 5,
               y: 50,
                value: 50
            };
            heatmap.addData(drawObj);
            c++;
            }
            var dataObject = [];
            for(let i=0;i<3;i++)
                {
            var obj={
                    version: data[i][0],
                    c1: data[i][1],
                    c2: data[i][2],
                    c3: data[i][3],
                    c4: data[i][4],
                    c5: data[i][5],
                    c6: data[i][6],
                 }
                 dataObject.push(obj);
                }

                var myRender = function (instance, td, row, col, prop, value, cellProperties) {
                    var currentValue = value;
                    console.log(currentValue);
                   while (td.firstChild) {
                      td.removeChild(td.firstChild);
                    }
                    
                    var flagElement = document.createElement('DIV');
                    flagElement.setAttribute('id','c-'+row+'-'+(col-1));
                    td.appendChild(flagElement)
                    
                  };
            
              var hotElement = document.querySelector('#hot');
              var hotElementContainer = hotElement.parentNode;
              var hotSettings = {
                data: dataObject,
                columns: [
                  {
                    data: 'version',
                    type: 'text',
                    width: 70
                    
                  },
                  {
                    data: 'c1',
                    width: 150,
                    renderer: myRender
                  },
                  {
                    data: 'c2',
                    type: 'numeric',
                    renderer: myRender
                  },
                  {
                    data: 'c3',
                    type: 'numeric',
                    renderer: myRender
                  },
                  {
                    data: 'c4',
                    type: 'numeric',
                    renderer: myRender
                  },
                  {
                    data: 'c5',
                    type: 'numeric',
                    renderer: myRender
                  },
                  {
                    data: 'c6',
                    type: 'numeric',
                    width: 150
                  }
                ],
                stretchH: 'all',
                width: 1050,
                autoWrapRow: true,
                height: 150,
                maxRows: 3,
                rowHeaders: true,
                colHeaders: [
                    "Version",
                    "Executive General and Administration",
                    "Inventory Management",
                    "Manufacturing",
                    "Quality Assurance",
                    "Sales and Marketing",
                    "Research and Development"
                ],
                language: 'en-US',
                licenseKey: 'non-commercial-and-evaluation'
              };
              var hot = new Handsontable(hotElement, hotSettings);
        }
    }
  
  
     $onInit() {
        
        this.columnHeaders = [["Version","Executive General and Administration","Inventory Management","Manufacturing","Quality Assurance","Sales and Marketing","Research and Development"]];
        this.rowsData = [["Actual",-214569.02804853008,-105928.24112864747,6825.64149834103,-4314.147215432423,866378.2837408222,-204590.33887112237],
                         ["Budget",-352171.14227059274,-98795.9712060611,238.1234837768164,238.1234837768164,1512416.8967751563,-202891.60255816544],
                         ["Last Year",-309116.6502055696,-124991.3211540927,7183.136080128785,-4540.101692374503,-525266.1946542066,-244072.0727683794]];
        this.drawhandsone(this.rowsData);
        }
       
}

CustomHandsontableWidgetCtrl.$inject = ['$rootScope', '$timeout', '$scope'];

angular.module('DemoApp').component('customHandsontableWidget', {
    templateUrl: 'widgets/handsontable/handsontable-widget.html',
    controller: CustomHandsontableWidgetCtrl,
    bindings: {
    }
    
})

