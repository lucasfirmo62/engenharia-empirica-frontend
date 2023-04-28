import React from 'react';
import { Card, Form, Radio } from 'antd';
import './styles.css';

const QuestionCard = ({ mood }) => {
  const { type, description } = mood;

  return (
    <Card style={{marginTop: 16}} className="question-card" title={type} bordered={false}>
      <p>{description}</p>
      <Form.Item
        name={type === 'Com Medo' ? 'com_medo' : type.toLowerCase()}
        rules={[
          {
            required: true,
            message: 'Por favor, selecione um valor!',
          },
        ]}
      >
        <Radio.Group buttonStyle="solid">
          <div className="radio-group-description">
            <span>Pouquíssimo</span>
            <span>Um pouco</span>
            <span>Moderado</span>
            <span>Um pouco mais</span>
            <span>Muito</span>
          </div>
          <Radio.Button value="1">1</Radio.Button>
          <Radio.Button value="2">2</Radio.Button>
          <Radio.Button value="3">3</Radio.Button>
          <Radio.Button value="4">4</Radio.Button>
          <Radio.Button value="5">5</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Card>
  );
};

export default QuestionCard;