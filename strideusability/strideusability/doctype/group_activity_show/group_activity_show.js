// Copyright (c) 2022, Shahzad Naser and contributors
// For license information, please see license.txt
// import DataTable from "frappe-datatable";

frappe.ui.form.on('Group Activity Show', {
	onload: function(frm){

	},
	refresh: function(frm) {
		frm.add_custom_button("Add Group Activity", function() {
			add_group_activity(frm);
		}).addClass("btn-primary");

		if(frm.doc.branch)
			frm.trigger("branch");
	},
	branch(frm){
		// frappe.call({
		// 	method: 'strideusability.strideusability.doctype.group_activity_show.group_activity_show.get_activities',
		// 	args: {
		// 		"branch": frm.doc.branch || ""
		// 	},
		// 	callback: function(r) {
		// 		render_datatable(columns,r.message);
		// 	}
		// });
		frappe.call({
			method: 'strideusability.strideusability.doctype.group_activity_show.group_activity_show.get_html',
			args: {
				"branch": frm.doc.branch || ""
			},
			callback: function(r) {
				$('[data-fieldname="html_2"').html(r.message);
			}
		});
	}
});

const add_group_activity = function(frm) {
	let dialog = new frappe.ui.Dialog({
		title: __("Create Group Activity"),
		fields: [
			{
				label: __("Branch"),
				fieldtype: "Link",
				fieldname: "branch",
				options: "Branch",
				default: frm.doc.branch,
				reqd: 1,
			},
			{
				label: __("From Date"),
				fieldtype: "Date",
				fieldname: "from_date",
				default: frappe.datetime.get_today(),
				reqd: 1,
			},
			{
				label: __("Duration"),
				fieldtype: "Data",
				fieldname: "duration",
				reqd: 1,
			}
		],
		primary_action(data) {
				frappe.call({
					method: "strideusability.strideusability.doctype.group_activity_show.group_activity_show.add_entry",
					args: {
						data: data
					},
					callback: function (r) {
						if (r.message === 1) {
							frappe.show_alert({
								message: __("Recrods Added Successfully"),
								indicator: 'blue'
							});
							dialog.hide();
						}
						frm.trigger("branch");
					}
				});
			dialog.hide();
		},
		primary_action_label: __('Create Group Activity')

	});
	dialog.show();
}


