# Copyright (c) 2022, Shahzad Naser and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
import json

class GroupActivityShow(Document):
	pass



@frappe.whitelist()
def get_html(branch = ""):
	html = '<table class="table table-bordered"><thead><tr><th scope="col">Sr.No</th><th scope="col">Branch</th><th scope="col">From Date</th><th scope="col">Duration</th></tr></thead><tbody>'
	activities = get_activities(branch)
	if activities:
		ronwno = 1
		for row in activities:
			html += '<tr>'
			html += '<td scope="row">{0}</td>'.format(ronwno)
			html += '<td scope="row">{0}</td>'.format(row.get("branch"))
			html += '<td scope="row">{0}</td>'.format(row.get("from_date"))
			html += '<td scope="row">{0}</td>'.format(row.get("duration"))
			html += '</tr>'
			ronwno += 1
		html += '</tbody></table>'
	else:
		html = '<div class="no-result text-muted flex justify-center align-center" style=""><div class="msg-box no-border"><p>No Record found</p></div></div>'


	return html

@frappe.whitelist()
def add_entry(data):
	if isinstance(data, str):
		data = json.loads(data)
	data = frappe._dict(data)
	if not data.get("from_date") or not data.get("duration") or  not data.get("branch"):
		frappe.throw(_("Branch, From Date and Duration are required."))
		return
	try:
		doc = frappe.new_doc("Group Activity")
		doc.branch = data.get("branch")
		doc.from_date = data.get("from_date")
		doc.duration = data.get("duration")
		doc.flags.ignore_permissions = True
		doc.save()
	except Exception as error:
		traceback = frappe.get_traceback()
		frappe.log_error(message=traceback , title="Error Whilte Creating Group Activity.")
		frappe.throw(_("Something went wrong please try again."))

	return True

def get_activities(branch=None):
	if not branch:
		return []
	# return [{
	# 	"branch":"Khobar",
	# 	"from_date":"2022-08-10",
	# 	"duration":100,
	# },
	# {
	# 	"branch":"Khobar",
	# 	"from_date":"2022-08-10",
	# 	"duration":100,
	# }]
	return frappe.db.get_list("Group Activity",filters={"branch":branch},fields=["branch","from_date","duration"])