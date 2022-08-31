frappe.provide("frappe.utils");
frappe.widget.widget_factory.shortcut.prototype.set_actions = function(){
    if (this.in_customize_mode) return;

    this.widget.addClass("shortcut-widget-box");
    if(this.class)
        this.widget.addClass(this.class);


    setTimeout(function(){
        $(".first-el").parents(".ce-block__content").addClass("pr-0");
        $(".mid-el").parents(".ce-block__content").addClass("plr-0");
        $(".last-el").parents(".ce-block__content").addClass("pl-0");

    },1000)
    let filters = frappe.utils.get_filter_from_json(this.stats_filter);
    if (this.type == "DocType" && filters) {
        frappe.db
            .count(this.link_to, {
                filters: filters,
            })
            .then((count) => this.set_count(count));
    }
}