import { isZhuyin, isEmptyString, isEmptyArray } from 'utils/base'
import { get, last } from 'lodash'

export default {
  shouldSkipDebounce: (_, e) => e.skipDebounce || false,
  withInput: ctx => !isEmptyString(ctx.input),
  withResultOnly: (ctx, e) => !isEmptyArray(ctx.result) && (isEmptyString(ctx.input) || isEmptyString(e.input)),
  invalidParams: ctx => isEmptyString(ctx.input) || isZhuyin(last(ctx.input.trim())),
  isNoResult: (_, e) => isEmptyArray(get(e, ['data', 'songs', 'result'], [])) // `Null` won't be replaced into defaulValue(third argument)
    || !get(e, ['data', 'songs', 'result'])
}