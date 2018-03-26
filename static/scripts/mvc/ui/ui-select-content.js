define("mvc/ui/ui-select-content",["exports","utils/localization","utils/utils","mvc/ui/ui-misc","mvc/ui/ui-select-default"],function(t,e,a,i,l){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(e),o=n(a),c=n(i),h=n(l),d={DISABLED:"disabled",ENABLED:"enabled",LINKED:"linked"},u={data:[{src:"hda",icon:"fa-file-o",tooltip:(0,s.default)("Single dataset"),multiple:!1,batch:d.DISABLED},{src:"hda",icon:"fa-files-o",tooltip:(0,s.default)("Multiple datasets"),multiple:!0,batch:d.LINKED},{src:"hdca",icon:"fa-folder-o",tooltip:(0,s.default)("Dataset collection"),multiple:!1,batch:d.LINKED}],data_multiple:[{src:"hda",icon:"fa-files-o",tooltip:(0,s.default)("Multiple datasets"),multiple:!0,batch:d.DISABLED},{src:"hdca",icon:"fa-folder-o",tooltip:(0,s.default)("Dataset collections"),multiple:!0,batch:d.DISABLED}],data_collection:[{src:"hdca",icon:"fa-folder-o",tooltip:(0,s.default)("Dataset collection"),multiple:!1,batch:d.DISABLED}],workflow_data:[{src:"hda",icon:"fa-file-o",tooltip:(0,s.default)("Single dataset"),multiple:!1,batch:d.DISABLED}],workflow_data_multiple:[{src:"hda",icon:"fa-files-o",tooltip:(0,s.default)("Multiple datasets"),multiple:!0,batch:d.DISABLED}],workflow_data_collection:[{src:"hdca",icon:"fa-folder-o",tooltip:(0,s.default)("Dataset collection"),multiple:!1,batch:d.DISABLED}],module_data:[{src:"hda",icon:"fa-file-o",tooltip:(0,s.default)("Single dataset"),multiple:!1,batch:d.DISABLED},{src:"hda",icon:"fa-files-o",tooltip:(0,s.default)("Multiple datasets"),multiple:!0,batch:d.ENABLED}],module_data_collection:[{src:"hdca",icon:"fa-folder-o",tooltip:(0,s.default)("Dataset collection"),multiple:!1,batch:d.DISABLED},{src:"hdca",icon:"fa-folder",tooltip:(0,s.default)("Multiple collections"),multiple:!0,batch:d.ENABLED}]},r=Backbone.View.extend({initialize:function(t){var e=this;this.model=t&&t.model||new Backbone.Model({src_labels:{hda:"dataset",hdca:"dataset collection"},pagelimit:100,statustimer:1e3}).set(t),this.setElement($("<div/>").addClass("ui-select-content")),this.button_product=new c.default.RadioButton.View({value:"false",data:[{icon:"fa fa-chain",value:"false",tooltip:"Linked inputs will be run in matched order with other datasets e.g. use this for matching forward and reverse reads."},{icon:"fa fa-chain-broken",value:"true",tooltip:"Unlinked dataset inputs will be run against *all* other inputs."}]});var a=$("<div/>").addClass("ui-form-info").append($("<i/>").addClass("fa fa-sitemap")).append($("<span/>").html("This is a batch mode input field. Separate jobs will be triggered for each dataset selection."));this.$batch={linked:a.clone(),enabled:a.clone().append($("<div/>").append($("<div/>").addClass("ui-form-title").html("Batch options:")).append(this.button_product.$el)).append($("<div/>").css("clear","both"))},this.$el.on("dragenter",function(t){this.lastenter=t.target,e.$el.addClass("ui-dragover")}).on("dragover",function(t){t.preventDefault()}).on("dragleave",function(t){this.lastenter===t.target&&e.$el.removeClass("ui-dragover")}).on("drop",function(t){e._handleDrop(t)}),this.history={},this.listenTo(this.model,"change:data",this._changeData,this),this.listenTo(this.model,"change:wait",this._changeWait,this),this.listenTo(this.model,"change:current",this._changeCurrent,this),this.listenTo(this.model,"change:value",this._changeValue,this),this.listenTo(this.model,"change:type change:optional change:multiple change:extensions",this._changeType,this),this.render(),this.on("change",function(){t.onchange&&t.onchange(e.value())})},render:function(){this._changeType(),this._changeValue(),this._changeWait()},wait:function(){this.model.set("wait",!0)},unwait:function(){this.model.set("wait",!1)},update:function(t){this.model.set("data",t)},value:function(t){void 0!==t&&this.model.set("value",t);var e=this.model.get("current");if(this.config[e]){var a=this.fields[e].value();if(null!==a&&(a=$.isArray(a)?a:[a]).length>0){var i=this._batch({values:[]});for(var l in a){var n=this.history[a[l]+"_"+this.config[e].src];if(!n)return Galaxy.emit.debug("ui-select-content::value()","Requested details not found for '"+a[l]+"'."),null;i.values.push(n)}return i.values.sort(function(t,e){return t.hid-e.hid}),i}}else Galaxy.emit.debug("ui-select-content::value()","Invalid value/source '"+t+"'.");return null},_changeCurrent:function(){var t=this;_.each(this.fields,function(e,a){t.model.get("current")==a?(e.$el.show(),_.each(t.$batch,function(e,i){e[t.config[a].batch==i?"show":"hide"]()}),t.button_type.value(a)):e.$el.hide()})},_changeType:function(){var t=this,e=(this.model.get("flavor")?this.model.get("flavor")+"_":"")+String(this.model.get("type"))+(this.model.get("multiple")?"_multiple":"");u[e]?this.config=u[e]:(this.config=u.data,Galaxy.emit.debug("ui-select-content::_changeType()","Invalid configuration/type id '"+e+"'."));var a=t.model.get("data"),i=o.default.textify(this.model.get("extensions")),l=this.model.get("src_labels");this.fields=[],this.button_data=[],_.each(this.config,function(e,n){t.button_data.push({value:n,icon:e.icon,tooltip:e.tooltip}),t.fields.push(new h.default.View({optional:t.model.get("optional"),multiple:e.multiple,searchable:!e.multiple||a&&a[e.src]&&a[e.src].length>t.model.get("pagelimit"),individual:!0,error_text:"No "+(i?i+" ":"")+(l[e.src]||"content")+" available.",onchange:function(){t.trigger("change")}}))}),this.button_type=new c.default.RadioButton.View({value:this.model.get("current"),data:this.button_data,onchange:function(e){t.model.set("current",e),t.trigger("change")}}),this.$el.empty();var n=0;this.fields.length>1&&(this.$el.append(this.button_type.$el),n=Math.max(0,36*this.fields.length)+"px"),_.each(this.fields,function(e){t.$el.append(e.$el.css({"margin-left":n}))}),_.each(this.$batch,function(e,a){t.$el.append(e.css({"margin-left":n}))}),this.model.set("current",0),this._changeCurrent(),this._changeData()},_changeWait:function(){var t=this;_.each(this.fields,function(e){e[t.model.get("wait")?"wait":"unwait"]()})},_changeData:function(){var t=this.model.get("data"),e=this,a={};_.each(t,function(t,i){a[i]=[],_.each(t,function(t){a[i].push({hid:t.hid,keep:t.keep,label:t.hid+": "+t.name,value:t.id,tags:t.tags}),e.history[t.id+"_"+i]=t})}),_.each(this.config,function(t,i){a[t.src]&&e.fields[i].add(a[t.src],function(t,e){return e.hid-t.hid})})},_changeValue:function(){var t=this.model.get("value");if(t&&t.values&&t.values.length>0){var e=[];_.each(t.values,function(t){e.push(t.id)});for(var a=t.values[0].src,i=t.values.length>1,l=0;l<this.config.length;l++){var n=this.fields[l],s=this.config[l];if(s.src==a&&-1!==[i,!0].indexOf(s.multiple)){this.model.set("current",l),n.value(e);break}}}else _.each(this.fields,function(t){t.value(null)})},_handleDrop:function(t){try{var e=this.model.get("data"),a=this.model.get("current"),i=this.config[a],l=this.fields[a],n=JSON.parse(t.originalEvent.dataTransfer.getData("text"))[0],s=n.id,o="dataset_collection"==n.history_content_type?"hdca":"hda",c={id:s,src:o};if(e&&n.history_id){if(_.findWhere(e[o],c)||(e[o].push({id:s,src:o,hid:n.hid||"Dropped",name:n.hid?n.name:s,keep:!0,tags:[]}),this._changeData()),i.src==o){var h=l.value();h&&i.multiple?-1==h.indexOf(s)&&h.push(s):h=s,l.value(h)}else this.model.set("value",{values:[c]}),this.model.trigger("change:value");this.trigger("change"),this._handleDropStatus("success")}else this._handleDropStatus("danger")}catch(t){this._handleDropStatus("danger")}t.preventDefault()},_handleDropStatus:function(t){var e=this;this.$el.removeClass("ui-dragover").addClass("ui-dragover-"+t),setTimeout(function(){e.$el.removeClass("ui-dragover-"+t)},this.model.get("statustimer"))},_batch:function(t){t.batch=!1;var e=this.model.get("current"),a=this.config[e];if("hdca"==a.src&&!a.multiple){var i=this.history[this.fields[e].value()+"_hdca"];i&&i.map_over_type&&(t.batch=!0)}return a.batch!=d.LINKED&&a.batch!=d.ENABLED||(t.batch=!0,a.batch==d.ENABLED&&"true"===this.button_product.value()&&(t.product=!0)),t}});t.default={View:r}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-select-content.js.map
