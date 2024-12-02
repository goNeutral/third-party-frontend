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

export const TimelineLayout = ({ transactions }) => {
	console.log(transactions[0].readerReadTime);
	return (
		<Timeline>
			{transactions.map((transaction) => (
				<TimelineItem key={transaction.seqNo}>
					<TimelineConnector />
					<TimelineHeader>
						<TimelineIcon />
						<TimelineTitle>{transaction.tollPlazaName}</TimelineTitle>
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
