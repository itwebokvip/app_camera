import React, { Component, FC } from 'react';
import { View, Text } from 'react-native';
import LoadingView from './LoadingView';
import { Sleep } from '../helper/index';
import { ColorStyle } from '../accessories/color';

interface Action {
    (param: any): Promise<any>;
}

interface Config {
    actions: Action[];
    SettUpAccessor: boolean;
}

const EnumStatus = {
    Loading: 'Loading',
    Loaded: 'Loaded',
    NoNetWork: 'NoNetWork',
    Error: 'Error',
};

const defaultConfig: Config = {
    actions: [],
    SettUpAccessor: true,
};

export default (WrappedComponent: FC) => {
    return (Config: Config = defaultConfig) => {
        Config = Object.assign({}, defaultConfig, Config);

        class hocComponent extends Component {
            static ContainerHandler: any[] = [];
            static RootHoc: any = null;
            IsUnmount: boolean = false;

            constructor(props: any) {
                super(props);
                this.state = {
                    Status: EnumStatus.Loading,
                    data: [],
                    Error: {},
                };
                this.UpdateNoNetWork = this.UpdateNoNetWork.bind(this);
                this.Refresh = this.Refresh.bind(this);
            }

            GetNone = (): JSX.Element => {
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, backgroundColor: 'white' }}></View>
                    </View>
                );
            };

            GetLoading = (): JSX.Element => {
                return <LoadingView />;
            };

            GetLoaded = (): JSX.Element => {
                return (
                    <WrappedComponent
                        Refresh={this.Refresh}
                        data={this.state.data}
                        {...this.props}
                    />
                );
            };

            GetNoNetWork = (): JSX.Element => {
                return <View Refresh={this.Refresh} />;
            };

            GetError = (): JSX.Element => {
                return (
                    <View style={{ flex: 1 }}>
                        {/* <Text>Error</Text> */}
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    color: ColorStyle.ColorBlack,
                                }}>
                                Không thể tải dữ liệu
                            </Text>
                        </View>
                    </View>
                );
            };

            GetSwitch = (): JSX.Element => {
                const { Status } = this.state;
                switch (Status) {
                    case EnumStatus.Loading:
                        return this.GetLoading();
                    case EnumStatus.Loaded:
                        return this.GetLoaded();
                    case EnumStatus.NoNetWork:
                        return this.GetNoNetWork();
                    case EnumStatus.Error:
                        return this.GetError();
                    default:
                        return this.GetNone();
                }
            };

            GetData = async (params: any): Promise<any> => {
                let { actions } = Config;
                if (!Array.isArray(params)) {
                    params = [];
                }
                if (!Array.isArray(actions)) {
                    actions = [];
                }
                const ListPromise = actions.map((action: Action, index: number) => {
                    return action(params[index]);
                });

                const data = await Promise.all(ListPromise);
                if (Array.isArray(data)) {
                    return data;
                } else {
                    return [[]];
                }
            };

            componentWillUnmount() {
                this.IsUnmount = true;
            }

            UpdateData = (data: any) => {
                if (this.IsUnmount) {
                    return;
                }
                this.setState({
                    Status: EnumStatus.Loaded,
                    data,
                });
            };

            UpdateError = (error: any) => {
                //Xu ly loi
                if (this.IsUnmount) {
                    return;
                }
                this.setState({
                    Status: EnumStatus.Error,
                    Error: {
                        message: 'Không thể kết nối server!',
                    },
                });
            };

            Refresh = (params: any) => {
                if (this.IsUnmount) {
                    return;
                }
                this.setState({
                    Status: EnumStatus.Loading,
                });
                this.ExecuteAction(params);
            };

            UpdateNoNetWork = () => {
                if (this.IsUnmount) {
                    return;
                }
                this.setState({
                    status: EnumStatus.NoNetWork,
                });
            };

            //thuc thi goi api lay du lieu
            ExecuteAction = async (params?: any) => {
                try {
                    if (!params) {
                        params = this.props.params;
                    }
                    let [data] = await Promise.all([this.GetData(params), Sleep(1000)]);
                    if (!Array.isArray(data)) {
                        data = [];
                    }
                    this.UpdateData(data);
                } catch (error) {
                    //console.log(error);
                    this.UpdateError(error);
                }
            };

            componentDidMount = () => {
                this.ExecuteAction();
            };

            render() {
                return this.GetSwitch();
            }
        }

        hocComponent.propTypes = {};

        return hocComponent;
    };
};