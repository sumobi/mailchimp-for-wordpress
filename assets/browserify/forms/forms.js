'use strict';

// deps
var EventEmitter = require('wolfy87-eventemitter');
var Form = require('./form.js');

// variables
var events = new EventEmitter();
var forms = [];

// get form by its id
// please note that this will get the FIRST occurence of the form with that ID on the page
function get(formId) {

	// do we have form for this one already?
	for(var i=0; i<forms.length;i++) {
		if(forms[i].id == formId) {
			return forms[i];
		}
	}

	// try to create from first occurence of this element
	var formElement = document.querySelector('.mc4wp-form-' + formId);
	return createFromElement(formElement,formId);
}

// get form by <form> element (or any input in form)
function getByElement(element) {
	var formElement = element.form || element;

	for(var i=0; i < forms.length; i++) {
		if(forms[i].element == formElement) {
			return forms[i];
		}
	}

	return createFromElement(formElement);
}

// create form object from <form> element
function createFromElement(formElement, id) {
	id = id || parseInt( formElement.getAttribute('data-id') ) || 0;
	var form = new Form(id, formElement);
	forms.push(form);
	return form;
}

function all() {
	return forms;
}

function on(event,callback) {
	return events.on(event,callback);
}

function trigger(event,args) {
	return events.trigger(event,args);
}

function off(event,callback) {
	return events.off(event,callback);
}

module.exports = {
	"all": all,
	"get": get,
	"getByElement": getByElement,
	"on": on,
	"trigger": trigger,
	"off": off
};

