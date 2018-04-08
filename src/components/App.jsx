import React from 'react';
import {Provider} from 'react-redux';
import MenuBar from 'components/MenuBar';
import WorkspaceGrid from 'components/WorkspaceGrid';
import Layout from 'components/Layout';

const App = ({store}) => (
	<Provider store={store}>
		<React.Fragment>
			<Layout>
				<Layout.Fixed>
					<MenuBar>
						Gantt Party
					</MenuBar>
				</Layout.Fixed>
				<Layout.Fixed style={{background: 'pink'}}>
					filters
				</Layout.Fixed>
				<Layout.Fluid>
					<WorkspaceGrid />
				</Layout.Fluid>
			</Layout>
		</React.Fragment>
	</Provider>
);

export default App;