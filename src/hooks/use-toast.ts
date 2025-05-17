
import { useState, useEffect } from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 10
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast> & Pick<ToasterToast, "id">
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

function useToast() {
  const [state, setState] = useState<State>({ toasts: [] })

  useEffect(() => {
    const timers = new Map<string, ReturnType<typeof setTimeout>>()

    state.toasts.forEach((toast) => {
      if (!toast.open && !timers.has(toast.id)) {
        const timer = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            toasts: prev.toasts.filter((t) => t.id !== toast.id),
          }))
        }, TOAST_REMOVE_DELAY)
        
        timers.set(toast.id, timer)
      }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [state.toasts])

  const toast = (props: Omit<ToasterToast, "id">) => {
    const id = genId()
    
    setState((prev) => ({
      ...prev,
      toasts: [
        {
          ...props,
          id,
          open: true,
        },
        ...prev.toasts,
      ].slice(0, TOAST_LIMIT),
    }))
    
    return {
      id,
      dismiss: () => {
        setState((prev) => ({
          ...prev,
          toasts: prev.toasts.map((t) =>
            t.id === id
              ? {
                  ...t,
                  open: false,
                }
              : t
          ),
        }))
      },
      update: (props: ToasterToast) =>
        setState((prev) => ({
          ...prev,
          toasts: prev.toasts.map((t) =>
            t.id === id ? { ...t, ...props } : t
          ),
        })),
    }
  }

  return {
    toasts: state.toasts,
    toast,
    dismiss: (toastId: string) => {
      setState((prev) => ({
        ...prev,
        toasts: prev.toasts.map((t) =>
          t.id === toastId
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }))
    },
  }
}

export { useToast, toast }
