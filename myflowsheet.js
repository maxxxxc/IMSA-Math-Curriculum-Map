function clearTable() {
	jQuery("#flowsheet table .prereq").removeClass("prereq");
	jQuery("#flowsheet table .postreq").removeClass("postreq");
	jQuery("#flowsheet table .immediate").removeClass("immediate");
}

function determinePostreqs(course_id) {
	objCourse = jQuery("div[data-course-id='" + course_id + "']");
	var course = objCourse.attr("data-id");
	objCourse.attr("data-post", "");
	jQuery("[data-pre~='" + course + "']").each(function (i, e) {
		var current = objCourse.attr("data-post");
		var newpost = current + " " + jQuery(this).attr("data-id");
		jQuery("div[data-id='" + course + "']").attr("data-post", newpost)
	});
}

function traverseReqs(course, direction, otherclass) {
	var reqstr = jQuery("div[data-id='" + course + "']").attr("data-" + direction);
	var reqarr = new Array();
	
	if(reqstr != null) {
		reqarr = reqstr.split(" ");
		for(var x = 0; x < reqarr.length; x++){
			crs = reqarr[x];
				
			if (otherclass !== undefined) jQuery("div[data-id='" + crs + "']").addClass(otherclass);
				
			if (jQuery("div[data-id='" + crs + "']").hasClass(direction + "req")) {

			}
			else {
				jQuery("div[data-id='" + crs + "']").addClass(direction + "req");
				traverseReqs(crs, direction);
			}
		}
	}
}


function addCourseTitle(course_id) {
	var myClass = jQuery("div[data-course-id='" + course_id + "']");
	var label = myClass.attr('data-label');
	var name = myClass.attr('data-name');

	var text = "<div class='rubric'>" + label + "</div><div class='crs_title'>" + name + "</div>";
	myClass.html(text);
}
	


jQuery(document).ready(function() { 

	jQuery("#courseTable div.course").each(function(){
		course_id = jQuery(this).attr("data-course-id");
		determinePostreqs(course_id);
		addCourseTitle(course_id);
	});

	// create mouseover event behavior for pre/post-requisite highlighting
	jQuery("#courseTable div").mouseover(function (e) {
		var course = jQuery(this).attr("data-id");
		if (course != undefined) {
			var content = jQuery(this).attr("data-content");
			jQuery("#coursecontent").html(content);
			traverseReqs(course, "pre", "immediate");
			traverseReqs(course, "post");
		}
		else {
			jQuery("#coursecontent").html("");
		}

	}).mouseout(clearTable);
});
	