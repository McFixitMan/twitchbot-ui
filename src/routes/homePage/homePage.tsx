import * as React from 'react';

import { Button, ButtonProps, Col, ColProps, Divider, Row } from 'antd';

import { Fade } from 'react-awesome-reveal';
import { PageWrapper } from '../../components/pageWrapper';
import { groupBy } from '../../utility/collections';
import { routes } from '../appRoutes';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = (props) => {
    const navigate = useNavigate();

    const homeButtonProps: ButtonProps = {
        style: {
            width: 300,
            height: 200,
            fontSize: '2.4em',
        },
        type: 'primary',
        shape: 'round',
    };

    const iconColProps: ColProps = {
        span: 24,
        style: {
            textAlign: 'center',
            fontSize: '1.5em',
        },
    };
    
    const textColProps: ColProps = {
        span: 24,
        style: {
            textAlign: 'center',
        },
    };

    const groupedRoutes = groupBy(Object.keys(routes).map((key) => routes[key]), x => x.groupName);
    
    return (
        <PageWrapper
            showLogo={true}
            pageTitle="Let's Go"
        >
            <Row
                align="top"
                justify="center"
                gutter={20}
            >   
                {Object.keys(groupedRoutes).map((key, index) => {
                    const itemArray = groupedRoutes[key];

                    if (!key) {
                        // No key means its a direct route
                        return (
                            itemArray.map((item) => {
                                if (item.title.toLowerCase() === 'home') {
                                    return undefined;
                                }

                                return (
                                    <Col 
                                        key={item.path}
                                        style={{ marginTop: 20 }}
                                    >
                                        <Fade direction="left" duration={300} triggerOnce={true}>
                                            <Button
                                                {...homeButtonProps}
                                                onClick={() => navigate(item.path)}
                                            >
                                                <Row
                                                    align="middle"
                                                    justify="center"
                                                >
                                                    <Col 
                                                        {...iconColProps}
                                                        style={{ fontSize: '2em' }}
                                                    >
                                                        {item.icon}
                                                    </Col>
            
                                                    <Col 
                                                        {...textColProps}
                                                    >
                                                        {item.title}
                                                    </Col>
                                                </Row>
                                        
                                            </Button>
                                        </Fade>
                                    </Col>
                                );
                            })
                        );
                    } else {
                        // We have a key, and therefore a group
                        return (
                            <Col span={24} key={`${key}${index}`}>
                                
                                <Row
                                    align="top"
                                    justify="center"
                                    gutter={20}
                                >
                                    <Col span={24}>
                                        <Row
                                            align="middle"
                                            justify="center"
                                        >
                                            <Col span={12}>
                                                <Divider>{key}</Divider>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {
                                        itemArray.map((item) => {
                                            if (item.title.toLowerCase() === 'home') {
                                                return undefined;
                                            }
            
                                            return (
                                                <Col 
                                                    key={item.path}
                                                    style={{ marginTop: 20 }}
                                                >
                                                    <Fade direction="left" duration={300} triggerOnce={true}>
                                                        <Button
                                                            {...homeButtonProps}
                                                            onClick={() => navigate(item.path)}
                                                        >
                                                            <Row
                                                                align="middle"
                                                                justify="center"
                                                            >
                                                                <Col 
                                                                    {...iconColProps}
                                                                    style={{ fontSize: '2em' }}
                                                                >
                                                                    {item.icon}
                                                                </Col>
                        
                                                                <Col 
                                                                    {...textColProps}
                                                                >
                                                                    {item.title}
                                                                </Col>
                                                            </Row>
                                                    
                                                        </Button>
                                                    </Fade>
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                            </Col>
                        );
                    }
                })}
            </Row>
        </PageWrapper>
    );
};