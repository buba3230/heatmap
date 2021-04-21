class CustomHandsontableWidgetCtrl {
    constructor($rootScope, $timeout, $scope) {
        this.$rootScope = $rootScope
        this.$timeout = $timeout
        this.$scope = $scope  
        this.heat = function(data){
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
          {
          for (let j=0;j<6;j++)
          {
            console.log('c-'+i+'-'+j);
            var config = {
              container: document.getElementById('c-'+i+'-'+j),
              radius: 250,
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
             x: 75,
             y: 25,
              value: percents[c].value
          };
          heatmap.addData(drawObj);
          c++;
          }
        }
        }      
        this.drawhandsone = function(data){

            
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
                  //  console.log(currentValue);
                   while (td.firstChild) {
                      td.removeChild(td.firstChild);
                    }
                    
                    var flagElement = document.createElement('DIV');
                    flagElement.setAttribute('id','c-'+row+'-'+(col-1));
                    flagElement.style.height='50px';
                    flagElement.style.width='150px';
                    td.appendChild(flagElement);
                    var textNode = document.createTextNode(value === null ? '' : value);
                    td.appendChild(textNode);
                    
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
                    width: 150,
                    renderer: myRender
                  },
                  {
                    data: 'c3',
                    width: 150,
                    renderer: myRender
                  },
                  {
                    data: 'c4',
                    width: 150,
                    renderer: myRender
                  },
                  {
                    data: 'c5',
                    width: 150,
                    renderer: myRender
                  },
                  {
                    data: 'c6',
                    width: 150,
                    renderer: myRender
                  }
                ],
                stretchH: 'all',
                width: 1050,
                autoWrapRow: true,
                height: 280,
                maxRows: 3,
                rowHeaders: false,
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
        var data = [[-214569.02804853008,-105928.24112864747,6825.64149834103,-4314.147215432423,866378.2837408222,-204590.33887112237],
                         [-352171.14227059274,-98795.9712060611,238.1234837768164,238.1234837768164,1512416.8967751563,-202891.60255816544],
                         [-309116.6502055696,-124991.3211540927,7183.136080128785,-4540.101692374503,-525266.1946542066,-244072.0727683794]];
        this.drawhandsone(this.rowsData);
        this.heat(data);
        }
       
}

CustomHandsontableWidgetCtrl.$inject = ['$rootScope', '$timeout', '$scope'];

angular.module('DemoApp').component('customHandsontableWidget', {
    templateUrl: 'widgets/handsontable/handsontable-widget.html',
    controller: CustomHandsontableWidgetCtrl,
    bindings: {
    }
    
})

