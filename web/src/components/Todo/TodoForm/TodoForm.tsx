import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'


const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


const TodoForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    props.onSave(data, props?.todo?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.todo?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>
        
          <DatetimeLocalField
            name="date"
            defaultValue={formatDatetime(props.todo?.date)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="date" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TodoForm
