const formatDate = (datestr: string) => {
	datestr.replace(' ', 'T');
	const date = new Date(datestr);
	const year = date.getFullYear();
	const month = date.toLocaleDateString('en-US', { month: 'short' });
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');

	const formattedHours = hours % 12 || 12;
	const ampm = hours >= 12 ? 'PM' : 'AM';

	return `${formattedHours.toString().padStart(2, '0')}:${minutes} ${ampm} \n ${day} ${month} ${year}`;
};

export { formatDate };
