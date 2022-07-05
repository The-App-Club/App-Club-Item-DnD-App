import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../plugins/utils';

const formData = [
  {
    id: 0,
    element: <h2>Form Header</h2>,
  },
  {
    id: 1,
    label: 'Full Name',
    element: (
      <div className="field-group">
        <input type="text" />
        <input type="text" />
      </div>
    ),
  },
  {
    id: 2,
    label: 'Email',
    element: <input type="email" />,
  },
  {
    id: 3,
    label: 'Address',
    element: <textarea name="address" id="" cols="30" rows="10" />,
  },
  {
    id: 5,
    label: 'Radio',
    element: (
      <div>
        <div>
          <label>
            <input type="radio" name="r" /> option 1
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="r" /> option 2
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="r" /> option 3
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="r" /> option 4
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="r" /> option 5
          </label>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    label: 'Options',
    element: (
      <select defaultValue="2">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </select>
    ),
  },
  {
    id: 6,
    label: 'Checkbox',
    element: (
      <div>
        <div>
          <label>
            <input type="checkbox" name="r" /> option 1
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="r" /> option 2
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="r" /> option 3
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="r" /> option 4
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="r" /> option 5
          </label>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    element: (
      <div>
        <button className="form-submit-button">Submit</button>
      </div>
    ),
  },
];

function Form() {
  const [form, setForm] = useState(formData);

  function onDrop(e) {
    const newForm = [...form] || [];

    setForm(applyDrag(newForm, e));
  }

  function generateForm(form) {
    return form.map((item) => {
      return (
        <Draggable key={item.id}>
          <div className={`form-line`}>
            <div className="label">
              <span>{item.label}</span>
            </div>
            <div className="field">{item.element}</div>
          </div>
        </Draggable>
      );
    });
  }

  return (
    <div className="form-demo">
      <div className="form">
        <Container
          style={{ paddingBottom: '200px' }}
          dragClass="form-ghost"
          dropClass="form-ghost-drop"
          onDrop={(e) => {
            onDrop(e);
          }}
          nonDragAreaSelector=".field"
        >
          {generateForm(form)}
        </Container>
      </div>
    </div>
  );
}

export default Form;
