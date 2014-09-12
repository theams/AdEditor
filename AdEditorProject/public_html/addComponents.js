/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var list = new Array();
var elementnumber = 0;
function closeComponent(){
    jQuery(".CloseButton").click(function(event){
        var child = event.target;
        var parrent = jQuery(child).parent();
        removeParrentFromList(parrent);
        jQuery(parrent).remove();
        updatePreviewArea();
    });
}

function updateList(id,property){
    var index = findIndexOfElementInList(id,list);
    var newText= document.getElementById(id).children[1].value;
    jQuery(list[index]).attr(property,newText);
    updatePreviewArea();
}

function textElement(text,id){
    this.text = text;
    this.id = id;    
}

function creatNewComponent(){
    var id="textArea"+elementnumber;
    elementnumber++;
    
    var textArea = document.createElement('textArea');
    textArea.style.float="left";
    textArea.style.height="95px";
    textArea.style.width="167.5px";
    textArea.style.maxheight="95px";
    textArea.style.maxwidth="167.5px"; 
    textArea.value = "this is a textbox";
    textArea.className = "textArea";
    textArea.oninput = function(){updateList(id,"text")};
    
    var button = document.createElement('button');
    button.className= "CloseButton";
    button.style.float="right";
    button.innerHTML = "x";
    button.onclick = function() {closeComponent()};
    
    var section = document.createElement('section');
    section.appendChild(button);
    section.appendChild(textArea);
    section.style.height="100px";
    section.style.width="200px";
    section.style.border="1px solid";
    section.style.margin="2px";
    section.id=id;
    
    list.push(new textElement(textArea.value,id));
    $(".EdtiArea").append(section);
    updatePreviewArea();
}

function updatePreviewArea(){
    var previewArea = jQuery(".PreviewArea");
    addNewComponentsToPreviewArea(previewArea);
    removeComponentsFromPreviewAreaThatNoLongerExsists(previewArea);
    updateExistingComponentsInPreviewArea(previewArea);
}

function updateExistingComponentsInPreviewArea(previewArea){
    for(var i = 0; i<list.length;i++){
        for(var j = 0; j<previewArea.children().length;j++){
            updateTextInPreviewComponent(list[i],previewArea.children()[j]);
        }
    }
}

function updateTextInPreviewComponent(listElement,previewAreaElement){
    if(previewAreaElement.id === jQuery(listElement).attr("id")){
        previewAreaElement.innerHTML = jQuery(listElement).attr("text");
    }
}

function removeComponentsFromPreviewAreaThatNoLongerExsists(previewArea){
    var elementsToRemove = new Array();
    for(var i = 0; i <previewArea.children().length;i++){
        for(var j = 0; j<list.length+1;j++){
            if(jQuery(list[j]).attr("id")===previewArea.children()[i].id){
                break;
            }else{
                if(j ===(list.length-1)){
                    elementsToRemove.push(previewArea.children()[i])
                }
            }
        }
    }
    for(var i = 0; i<elementsToRemove.length;i++){
        removeElementFromPreviewArea(elementsToRemove[i],previewArea);
    }
}

function removeElementFromPreviewArea(element,previewArea){
    var index = findIndexOfElementInList(element.id,previewArea.children());
    if(index >-1){
        jQuery(previewArea.children())[index].remove();
    }
}

function addNewComponentsToPreviewArea(previewArea){
    var doesNotExistsInPreview = new Array();
    for(var i= 0; i<list.length;i++){
        for(j = 0; j<(previewArea.children()).length;j++){
            if(previewArea.children()[j].id === jQuery(list[i]).attr("id")){
                break;
            }else{
                if(j === (previewArea.children().length-1)){
                    doesNotExistsInPreview.push(list[i]);
                }
            }
        }
    }
    for(var i=0; i< doesNotExistsInPreview.length;i++){
        if( doesNotExistsInPreview[i] instanceof textElement){
            var text= document.createElement("p");
            text.innerHTML = doesNotExistsInPreview[i].text;
            text.id = doesNotExistsInPreview[i].id;
            previewArea.append(text);
        }
    }
}

function removeParrentFromList(parrent)
{
    var id = jQuery(parrent).attr("id");
    var index = findIndexOfElementInList(id,list);
    if(index >-1){
        list.splice(index,1);
    }
}

function findIndexOfElementInList(id,list){
    var index = -1;
    for(var i= 0; i<list.length;i++){
        if (jQuery(list[i]).attr("id")===id){
            index = i;
        }
    }
    return index;
}




