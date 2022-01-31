import './pageWrapper.less';

import * as React from 'react';

import { Button, Col, Divider, Row } from 'antd';
import { LoadingOutlined, RobotOutlined, WarningOutlined } from '@ant-design/icons/lib/icons';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export type NonIdealAction = 'back' | 'reload' | 'home' | 'logout' | 'login';

interface PageWrapperProps {
    style?: React.CSSProperties;

    /**
     * @summary If supplied, a page title for the wrapped content will be rendered
     * 
     * @example pageTitle="Home Page"
     * @example pageTitle={<h1>Home Page</h1>}
     */
    pageTitle?: React.ReactNode;
    /**
     * @summary The class name to add to the container element
     */
    containerClassName?: string;
    /**
     * @summary Indicates that the PageWrapper is in a non-ideal state
     * 
     * @description When in a non-ideal state, an overlay will be displayed preventing
     * further interaction with the wrapped content
     * 
     * @example isNonIdeal={this.props.hasError}
     */
    isNonIdeal?: boolean;
    /**
     * @summary The icon type to show (from antd) when the PageWrapper is in a non-ideal state
     * 
     * Will default to 'meh'
     * 
     * @link https://ant.design/components/icon/
     */
    nonIdealIcon?: React.ReactNode;
    /**
     * @summary A header message to show when the PageWrapper is in a non-ideal state
     */
    nonIdealHeader?: string;
    /**
     * @summary A subheader message to show when the PageWrapper is in a non-ideal state
     */
    nonIdealSubheader?: string;
    /** 
     * @summary Actions to be made available when in a non-ideal state
     * 
     * - back => go back in history
     * - reload => hard reload the page
     * - home => navigate to the /home directory
     * - logout => logout of the app
     * 
     * Can include multiple actions
     * @example nonIdealActions={['back']}
     * @example nonIdealActions={['back', 'reload', 'home']}
     */
    nonIdealActions?: Array<NonIdealAction>;

    isLoading?: boolean;
    loadingMessage?: string;
    showLogo?: boolean;

    innerRef?: React.Ref<HTMLDivElement>; 
}

export const PageWrapper: React.FC<PageWrapperProps> = (props) => {
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();

    const className = classNames('page-wrapper', props.containerClassName);

    const containerStyle: React.CSSProperties = props.isNonIdeal 
        ? { ...props.style, overflow: 'hidden' } 
        : { ...props.style };

    const handleGoBack = (): void => {
        navigate(-1);
    };
    
    const handleReload = (): void => {
        window.location.reload();
    };
    
    const handleGoHome = (): void => {
        navigate('');
    };
    
    const handleLogout = (): void => {
        // dispatch(logout());
    };

    const handleLogin = (): void => {
        navigate('/login');
    };

    const overrideActionText = (action?: NonIdealAction): string => {
        if (action === 'back') {
            return 'go back';
        }
        if (action === 'home') {
            return 'go home';
        }

        return action || '';
    };

    const handleActionClicked = (action: NonIdealAction): void => {
        switch (action) {
            case 'back': {
                handleGoBack();
                break;
            }

            case 'reload': {
                handleReload();
                break;
            }

            case 'home': {
                handleGoHome();
                break;
            }

            case 'logout': {
                handleLogout();
                break;
            }

            case 'login': {
                handleLogin();
                break;
            }

            default: {
                // other
                break;
            }
        }
    };

    // This feels gross
    const IconElement: React.FC<{ className: string }> = () => <span className="non-ideal-icon">{props.nonIdealIcon}</span>;

    return (
        <Row 
            className={className}
            style={containerStyle}
            align="top"
            justify="center"
            ref={props.innerRef}
        >
            <Col
                xxl={24}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                style={{ padding: 5 }}
            >
                {/* <Card> */}
                <Row
                    align="top"
                    justify="center"
                    className="confirmation-page page"
                >
                    <Col span={24}>
                        {(props.showLogo ?? false) &&
                        <Row
                            align="middle"
                            justify="center"
                        >
                            <Col className="header-title" style={{ margin: 10 }}>
                                <span className="bold">McFixit</span><span className="lighter">BOT</span>
                                <span><RobotOutlined size={15} style={{ margin: '0 10px' }} /></span>
                            </Col>
                        </Row>
                        }
                        
                        {!!props.pageTitle &&
                        <Divider style={{ fontSize: '1.7em' }}>{props.pageTitle}</Divider>
                        }
                        
                    </Col>
                </Row>

                {props.children}
                
            </Col>

            {!!props.isNonIdeal === true &&
                        <div className="non-ideal-page">
    
                            <p>
                                {
                                    !!IconElement
                                        ?
                                        <IconElement className="non-ideal-icon" />
                                        :
                                        <WarningOutlined className="non-ideal-icon" />
                                }
                                
                            </p>
                            <p className="non-ideal-header">
                                {props.nonIdealHeader}
                            </p>
                            <p className="non-ideal-subheader">
                                {props.nonIdealSubheader}
                            </p>
    
                            <div>
                                {!!props.nonIdealActions && 
                                    props.nonIdealActions.map((action) => {
                                        return (
                                            <Button 
                                                key={action}
                                                size="large" 
                                                type="default"
                                                onClick={() => handleActionClicked(action)}
                                                style={{ textTransform: 'capitalize', margin: '0px 15px', width: '120px' }}
                                            >
                                                {overrideActionText(action)}
                                            </Button>
                                        );
                                    })
                                }
                            </div>
                            
                        </div>
            }
    
            {props.isLoading === true &&
                <div className="page-wrapper-loading">
                    <p>
                        <LoadingOutlined className="page-wrapper-loading-icon" />
                    </p>
                    <p className="page-wrapper-loading-header">
                        {props.loadingMessage || 'Loading...'}
                    </p>
                </div>
            }
        </Row>
    );
};