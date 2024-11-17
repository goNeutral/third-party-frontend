import Link from 'next/link';
import { PanelsTopLeft } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/admin-panel/menu';
import {
	sidebarToggleAtom,
	useSidebarToggle,
} from '@/hooks/use-sidebar-toggle';
import { SidebarToggle } from '@/components/admin-panel/sidebar-toggle';
import { useRecoilState } from 'recoil';
import { useAtom } from 'jotai';

export function Sidebar(): JSX.Element {
	const [sidebarToggle, setSidebarToggle] = useAtom(sidebarToggleAtom);

	return (
		<aside
			className={cn(
				'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
				!sidebarToggle ? 'w-[90px]' : 'w-72'
			)}
		>
			<SidebarToggle
				isOpen={sidebarToggle}
				setIsOpen={() => {
					setSidebarToggle(!sidebarToggle);
				}}
			/>
			<div className='relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800'>
				<Button
					className={cn(
						'transition-transform ease-in-out duration-300 mb-1',
						!sidebarToggle ? 'translate-x-1' : 'translate-x-0'
					)}
					variant='link'
					asChild
				>
					<Link href='/' className='flex items-center gap-2'>
						<PanelsTopLeft className='w-6 h-6 mr-1' />
						<h1
							className={cn(
								'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
								!sidebarToggle
									? '-translate-x-96 opacity-0 hidden'
									: 'translate-x-0 opacity-100'
							)}
						>
							GoNeutral
						</h1>
					</Link>
				</Button>
				<Menu isOpen={sidebarToggle} />
			</div>
		</aside>
	);
}
