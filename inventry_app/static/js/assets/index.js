
// Show Goal
const grocery = () => {
	$.get('add_grocery_item', function (res) {
		var ele = '';
		var resData = res
		count = 0;
		for (i = 0; i < resData.length; i++) {
			
			ele += '<tr><td>' + (resData[i].name) + '</td><td>' + (resData[i].target) + '</td><td><a td_pk="' + resData[i].pk + '"td_name="' + resData[i].name +
				'"td_quantity="' + resData[i].quantity + '"type="button" id="goal_edit' + i + '" data-toggle="modal" onclick="editgoal(this)"  href="javascript:void(0);"' +
				'data-target="#edit-goal-modal" style="color:#0060fa;font-size:30px;"><i class="mdi mdi-border-color text-primary"></i></a></td>' +
				'<td><a type="button" id="del' + i + '"  onclick="goal_delete(this)" style="color: red;font-size:30px;"href="javascript:void(0);"delId="' + resData[i].pk + '" >' +
				'<i class="mdi mdi-delete text-danger"></i></a></td></tr>'
		}
		if(!resData.length){
			ele += `<tr>
						<td colspan="6">No data available in table</td>
					</tr>`
		}
		$('#goal_table').html(ele);
	});
}
grocery();



// Add goal start //
$("#add_grocery_form").on('submit', function (e) {
	e.preventDefault()
	var form_data = $(this).serialize()
	$.post("add_grocery_item_goal", form_data, function (res) {
		if (res["res"] == "success") {
			// $("#add_grocery_form").trigger("reset")
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Added Successfully",
				showConfirmButton: false,
				timer: 1500
			})
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: res['msg'],
				showConfirmButton: false,
				timer: 1500
			})
		}
		grocery();
		// hideModal('add-goal-modal')
	})
	return false
})



const edit_power = (tis) => {
	$('.edit_pk').val($(tis).attr('td_pk'));
	$('.edit_tank option').removeAttr('selected')
		.filter(`[value=${$(tis).attr('td_tank')}]`).attr('selected', true)
	$('.max_kw').val($(tis).attr('td_max'))
	$('.min_kw').val($(tis).attr('td_min'));

}

// Edit Goal
$("#edit-goal-form").submit(function (evt) {
	evt.preventDefault()
	var form_data = $(this).serialize()
	$.put('add_goal', form_data, function (res) {
		if (res.res == 'success') {
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Updated Successfully',
				showConfirmButton: false,
				timer: 1500
			})
			$("#edit-goal-modal").modal('toggle')
		}

		goal();
		hideModal('edit-goal-modal')
	})
})

// Delete Goal
const goal_delete = (camId) => {
	Swal.fire({
		title: 'Are you sure ? ',
		text: "Do you want to delete this target",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#191C5B',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes'
	}).then((result) => {
		if (result.isConfirmed) {
			delId = {
				'pk': $(camId).attr('delId')
			}
			$.delete('add_goal', delId, (res) => {
				if (res['res'] == "success") {
					// alert('Deleted Success')
					goal()

				}
			})
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Deleted Successfully',
				showConfirmButton: false,
				timer: 1500
			})
			goal();

		}
	})
}
