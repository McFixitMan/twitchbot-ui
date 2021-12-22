import * as React from 'react';

import { Button, ButtonProps, Col, ColProps, Row } from 'antd';
import { GroupOutlined, OrderedListOutlined } from '@ant-design/icons';

import { Fade } from 'react-awesome-reveal';
import { PageWrapper } from '../../components/pageWrapper';
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
                <Col 
                    style={{ marginTop: 20 }}
                >
                    <Fade direction="left" duration={300} triggerOnce={true}>
                        <Button
                            {...homeButtonProps}
                            onClick={() => navigate('/queue-info')}
                        >
                            <Row
                                align="middle"
                                justify="center"
                            >
                                <Col 
                                    {...iconColProps}
                                >
                                    <OrderedListOutlined style={{ fontSize: '2em' }} />
                                </Col>

                                <Col 
                                    {...textColProps}
                                >
                                    Queue Info
                                </Col>
                            </Row>
                            
                        </Button>
                    </Fade>
                </Col> 

                <Col 
                    style={{ marginTop: 20 }}
                >
                    <Fade direction="left" duration={300} triggerOnce={true}>
                        <Button
                            {...homeButtonProps}
                            onClick={() => navigate('/overlay')}
                        >
                            <Row
                                align="middle"
                                justify="center"
                            >
                                <Col 
                                    {...iconColProps}
                                >
                                    <GroupOutlined style={{ fontSize: '2em' }} />
                                </Col>

                                <Col 
                                    {...textColProps}
                                >
                                    Overlay
                                </Col>
                            </Row>
                            
                        </Button>
                    </Fade>
                </Col> 
            </Row>
        </PageWrapper>
    );
};