import React from 'react';
import MenuBar from 'components/MenuBar';
import ProjectGrid from 'components/ProjectGrid';
import Layout from 'components/Layout';

const App = () => (
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
				<ProjectGrid />
			</Layout.Fluid>
		</Layout>
	</React.Fragment>
);

export default App;