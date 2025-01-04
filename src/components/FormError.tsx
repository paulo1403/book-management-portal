export const FormError = ({ message }: { message: string }) => (
  <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-1">
    {message}
  </div>
);

export default FormError;
