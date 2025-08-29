import { createStore } from 'solid-js/store';
import { For } from 'solid-js'
import './App.css'
import { Select, createOptions } from '@thisbeyond/solid-select';
import "@thisbeyond/solid-select/style.css"

const pageTypes = ["Tag", "Item", "Machine", "Recipie"] as const
const constants = ["list"] as const;

function App() {
	const [pageOptions, setPageOptions] = createStore({
		[pageTypes[0]]: { open: 1, [constants[0]]: ["1", "2"] as string[], active: [] as string[], possible: [] as string[] },
		[pageTypes[1]]: { open: 1, [constants[0]]: [] as string[], active: [] as string[], possible: [] as string[] },
		[pageTypes[2]]: { open: 1, [constants[0]]: [] as string[], active: [] as string[], possible: [] as string[] },
		[pageTypes[3]]: { open: 1, [constants[0]]: [] as string[], active: [] as string[], possible: [] as string[] }
	});

	return (
		<>
			<For each={pageTypes}>
				{page => {
					setPageOptions(page, "possible", pageOptions[pageTypes[0]][constants[0]].filter(v => pageOptions[page].active.indexOf(v) === -1))
					const props = createOptions(() => pageOptions[page].possible)
					return <div>
						<button type='button' onclick={() => {
							setPageOptions(page, "open", old => old ^ 1);
						}}>{page + "s"}</button>
						<ul id={page.toLowerCase()} style={{ display: ["flex", "none"][pageOptions[page].open] }}>
							<li>
								<input type='text' placeholder={page + "Name"}></input>
								<Select class={'select' + page} multiple {...props} onChange={(e: string[]) => {
									setPageOptions(page, "active", e)
									setPageOptions(page, "possible", pageOptions[pageTypes[0]][constants[0]].filter(v => e.indexOf(v) === -1))
								}}></Select>
								<button type='button'>Add</button>
							</li>
						</ul>
					</div>
				}}
			</For>
		</>
	)
}

export default App
