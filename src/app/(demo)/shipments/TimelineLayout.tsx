"use client";

import React from "react";
import {
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineTitle,
	TimelineIcon,
	TimelineDescription,
	TimelineContent,
	TimelineTime,
} from "@/components/ui/timeline";
import { formatDate } from "@/utils/datetime";

const capitalizeWords = (text) => {
	const str = text.toLowerCase();
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export const TimelineLayout = ({ transactions }) => {
	console.log(transactions[0].readerReadTime);
	return (
		<Timeline>
			{transactions.map((transaction) => (
				<TimelineItem key={transaction.seqNo}>
					<TimelineConnector />
					<TimelineHeader>
						<TimelineIcon />
						<TimelineTitle>{capitalizeWords(transaction.tollPlazaName)}</TimelineTitle>
					</TimelineHeader>
					<TimelineContent>
						<TimelineDescription className="h-1">{formatDate(transaction.readerReadTime)}</TimelineDescription>
					</TimelineContent>
				</TimelineItem>
			))}
			<TimelineItem>
				<TimelineHeader>
					<TimelineIcon />
					<TimelineTitle>Order Placed</TimelineTitle>
				</TimelineHeader>
			</TimelineItem>
		</Timeline>
	);
};
