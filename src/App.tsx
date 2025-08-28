import { For } from 'solid-js'
import './App.css'

const pageTypes = ["Tags", "Items", "Machines", "Recipies"]

function App() {
	return (
		<>
			<For each={pageTypes}>
				{page =>
					<div class='page-part'>
						<button type='button' onclick={e => {
							const nextElement = (e.target.nextElementSibling as HTMLElement)

							nextElement.style.display = {
								'none': 'flex',
								'flex': 'none'
							}[nextElement.style.display as 'none' | 'flex']
						}}>{page}</button>
						<ul id={page.toLowerCase()} style={{ display: "none" }}>
							<li><button type='button'>Add</button></li>
						</ul>
					</div>
				}
			</For>
		</>
	)
}

export default App
