const displayCost = (cost) => {
	// Convert to two decimal places
	let val = `${cost.toFixed(2)}`;
  
	// Add commas as per the Indian numbering system
	val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	console.log(val)

	val = val.replace(/(\d+)(?=(\d{2}){1,2}\.)/g, (match, p1) => {
	  const parts = p1.split(/(?=(?:\d{2})+(?:\.\d{0,2})?$)/);
	  return parts.join(",");
	});
  
	return val;
  };