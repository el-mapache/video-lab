function Filter(imageData) {
	this.data = imageData.data;
	this.dataLength = data.length;
}

// Mehtod to be implementd by child. Create any lookup tables here
Filter.prototype.onBeforeApply = function() {};



/*
	For any given filter, all the filter needs is the next value to process.
	So, for each pixel value, we run through the filter and find the lookup value,
	we do this for each channel and each point.

	This means filters dont need to have a concept of image data, they can 
	just take in a value and transform it as needed.

	how will this affect performance?
*/