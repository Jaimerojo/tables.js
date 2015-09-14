
function exportExcel(one_tableid, two_tableid, tree_tableid) {
	var table     = {};
	table['table'] = [];
	for(var k = 0; k < arguments.length; k++){
		var id = document.getElementById(arguments[k]);

		if(typeof(id) != undefined && id != null){
			var tr        = id.getElementsByTagName('tr').length;
			var th        = id.getElementsByTagName('th').length;
			var json      = {};
			json['rows']  = tr;
			json['cells'] = th;
			json['data']  = [];
		   	
			for (var i = 0; i < tr; i++) {
         		json.data.push([]);

				if(th != 0){
					for (var j = 0; j < th; j++){
						if(typeof(id.rows[i].cells[j]) != undefined && id.rows[i].cells[j] != null) {
							var data_cell = id.rows[i].cells[j].innerText; 
							
							if($(id.rows[i].cells[j]).find('img').attr('src')){
								data_cell = $(id.rows[i].cells[0]).find('img').attr('src');
							}

							json.data[i].push(data_cell);
						}
					};	
				}else{
					var data_cell = id.rows[i].innerText; 
					json.data[i].push(data_cell);
				}
			};	
		}else{alert("The table is not defined"); }

		
		table.table.push(json);
		
		}
   var json = JSON.stringify(table);
		console.log(json);
	
	$.ajax({
			url: 'reportexcel.php', 
			type:'POST', 
			data: {data:json},
			success: function(data){
				alert(data);	
			}
		})
}

