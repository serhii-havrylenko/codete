import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { RoutesEnum } from '../../constants';
import Layout from '../Layout';
import { FAQ, Images, NotFound } from '../Pages';

interface RoutesProps {
  routing?: RouterStore;
}

@inject('routing')
@observer
class Routes extends React.Component<RoutesProps> {
  public render() {
    return (
      <Layout>
        <Switch location={this.props.routing!.location}>
          <Route exact={true} path="/" component={Images} />
          <Route path={RoutesEnum.Images} component={Images} />
          <Route path={RoutesEnum.FAQ} component={FAQ} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}
export default Routes;
