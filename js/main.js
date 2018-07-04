$(document).ready(function() {

    /* Highlights navigation bar menu item if it's active */
    $(".nav-item").each(function(){
        var a = $(this).find('a:first');
        var link = a.attr("href");
        var pathname = window.location.pathname;
        if (link === pathname) {
            $(this).addClass('active');
            return;
        }
    });

    
});



/* Validation
 *
 *
 *
 */

function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}



/* DOM Manipulation
 *
 *
 *
 */






/* AJAX
 *
 *
 *
 */
function getAJAX(model,logic,toScript,fromAjax,timeout,disableOverlay) {    
    var timerStart = Date.now();
    if (!disableOverlay) $('#overlay').show();
    return $.ajax({
        url: 'routerAjax.php',
        type: 'POST',
        data: {
            model: model,
            logic: logic,
            toScript: toScript,
            fromAjax: fromAjax
            },
        dataType: 'html',
        cache: false,
        timeout: timeout
    })
    .fail(function(res) {
      console.log(res);
      console.log('AJAX Error');
    })
    .always(function(res) {
        if (!disableOverlay) $('#overlay').hide();
        console.log('AJAX Time: '+ (Date.now()-timerStart) );
        //if (isJson(res) === false ) alert(res);
    });
}






/* Storage
 *
 *
 *
 */
function getColorArray() {
    return ['#4572A7', '#AA4643', '#0ba828', '#80699B', '#3D96AE','#DB843D', '#92A8CD', '#A47D7C', '#B5CA92',"#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
}


function getDataTablesOptions() {
  var o = {
            iDisplayLength: 15,
            dom:
                "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
                "<'row'<'col-sm-12 px-0'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            buttons: [
                'copy', 'csv', 'excel',
            ],
            language: {
                search: "Search a lag value:",
                info: "_START_ - _END_ (_TOTAL_ total rows)"
            },
            columnDefs: [{
            }],
            order: [ 0, "asc" ],
            pagingType: "full_numbers"
          };
  return o;
}

function getHighChartsOptions() {
  var o = {
        chart: {
            backgroundColor: 'rgba(225, 233, 240,.6)',
            plotBackgroundColor: '#FFFFFF',
            plotBorderColor: '#C0C0C0',
            height: 500,
        }
  };
        
  return o;
}






/* Misc
 *
 *
 *
 */
function arrayColumn(array, columnName) {
    return array.map(function(value,index) {
        return value[columnName];
    })
}





