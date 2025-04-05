import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { UserAuth, Offer, Comment, CommentAuth, FavoriteAuth, UserRegister, NewOffer, User } from '../types/types';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { Token } from '../utils/common';
import { adaptCommentsToClient, adaptCommentToClient, adaptOffersToClient, adaptOfferToClient, adaptUserToClient } from '../utils/adapters/adaptersToClient';
import { adaptCreateCommentToServer, adaptSignUpToServer } from '../utils/adapters/adaptersToServer';
import OfferDTO from '../dto/offer/offer.dto';
import CommentDTO from '../dto/comment/comment.dto';
import UserDTO from '../dto/user/user.dto';
import LoginUserDTO from '../dto/user/login-user.dto';
import UserWithTokenDTO from '../dto/user/user-with-token.dto';
import { errorHandle } from '../services/error-handler';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  POST_OFFER: 'offer/post-offer',
  EDIT_OFFER: 'offer/edit-offer',
  DELETE_OFFER: 'offer/delete-offer',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  FETCH_PREMIUM_OFFERS: 'offers/fetch-premium',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  POST_FAVORITE: 'offer/post-favorite',
  DELETE_FAVORITE: 'offer/delete-favorite',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  FETCH_USER_AVATAR: 'user/fetch-avatar',
  REGISTER_USER: 'user/register',
};

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: Extra }>(
  Action.FETCH_OFFERS,
  async (_, { extra: { api }}) => {
    try {
      const { data } = await api.get<OfferDTO[]>(ApiRoute.Offers);
      return adaptOffersToClient(data);
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }
  });

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, { extra: Extra }>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_, { extra: { api }}) => {
    try {
      const { data } = await api.get<OfferDTO[]>(ApiRoute.Favorite);
      return adaptOffersToClient(data);
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }
  });

export const fetchOffer = createAsyncThunk<Offer, Offer['id'], { extra: Extra }>(
  Action.FETCH_OFFER,
  async (id, { extra: { api, history } }) => {
    try {
      const { data } = await api.get<OfferDTO>(`${ApiRoute.Offers}/${id}`);
      return adaptOfferToClient(data);
    } catch (error) {
      errorHandle(error);
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.BAD_REQUEST) {
        history.push(AppRoute.NotFound);
      }
      return Promise.reject(error);
    }
  });

export const postOffer = createAsyncThunk<Offer, NewOffer, { extra: Extra }>(
  Action.POST_OFFER,
  async (newOffer, { extra: { api, history } }) => {
    try {
      const { data } = await api.post<OfferDTO>(ApiRoute.Offers, newOffer);
      history.push(`${AppRoute.Property}/${data.id}`);
      return adaptOfferToClient(data);
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }

  });

export const editOffer = createAsyncThunk<Offer, Offer, { extra: Extra }>(
  Action.EDIT_OFFER,
  async (offer, { extra: { api, history } }) => {
    try {
      const { data } = await api.patch<OfferDTO>(`${ApiRoute.Offers}/${offer.id}`, offer);
      history.push(`${AppRoute.Property}/${data.id}`);
      return adaptOfferToClient(data);
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }
  });

export const deleteOffer = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_OFFER,
  async (id, { extra: { api, history } }) => {
    try {
      await api.delete(`${ApiRoute.Offers}/${id}`);
      history.push(AppRoute.Root);
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }
  });

export const fetchPremiumOffers = createAsyncThunk<Offer[], string, { extra: Extra }>(
  Action.FETCH_PREMIUM_OFFERS,
  async (cityName, { extra: { api } }) => {
    try {
      const { data } = await api.get<OfferDTO[]>(`${ApiRoute.Premium}?city=${cityName}`);
      return adaptOffersToClient(data);
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }
  });

export const fetchComments = createAsyncThunk<Comment[], Offer['id'], { extra: Extra }>(
  Action.FETCH_COMMENTS,
  async (id, { extra: { api } }) => {
    try {
      const { data } = await api.get<CommentDTO[]>(`${ApiRoute.Comments}/${id}`);
      return adaptCommentsToClient(data);
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }
  });

export const fetchUserStatus = createAsyncThunk<UserAuth['email'], undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra: { api } }) => {
    try {
      const { data } = await api.get<UserDTO>(ApiRoute.Login);
      return data.email;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
        Token.drop();
      }
      return Promise.reject(error);
    }
  });

export const fetchUserAvatar = createAsyncThunk<User, undefined, { extra: Extra }>(
  Action.FETCH_USER_AVATAR,
  async (_,{ extra: { api } }) => {
    try {
      const { data } = await api.get<UserDTO>(ApiRoute.Login);
      return adaptUserToClient(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
        Token.drop();
      }
      return Promise.reject(error);
    }
  });

export const loginUser = createAsyncThunk<UserAuth['email'], LoginUserDTO, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra: { api, history }}) => {
    try {
      const { data: { token } } = await api.post<UserWithTokenDTO>(ApiRoute.Login, { email, password });
      Token.save(token);
      history.push(AppRoute.Root);
      return email;
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }
  });

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra: { api }}) => {
    await api.delete(ApiRoute.Logout);
    Token.drop();
  });

export const registerUser = createAsyncThunk<void, UserRegister, { extra: Extra }>(
  Action.REGISTER_USER,
  async ({ email, password, name, avatar, type }, { extra: { api, history } }) => {
    const body = adaptSignUpToServer({ email, password, name, type });
    try {
      const { status } = await api.post<{ id: string }>(ApiRoute.Register, body);
      const { data: { token } } = await api.post<UserWithTokenDTO>(ApiRoute.Login, { email, password });
      Token.save(token);
      if (avatar && avatar.size && status === HttpCode.CREATED) {
        const payload = new FormData();
        payload.append('avatar', avatar);
        await api.post(`${ApiRoute.Avatar}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      history.push(AppRoute.Root);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
        history.push(AppRoute.Login);
      }
      return Promise.reject(error);
    }
  }
);

export const postComment = createAsyncThunk<Comment, CommentAuth, { extra: Extra }>(
  Action.POST_COMMENT,
  async ({ id, comment, rating }, { extra: { api } }) => {
    try {
      const body = adaptCreateCommentToServer(id, { comment, rating });
      const { data } = await api.post<CommentDTO>(`${ApiRoute.Comments}/${id}`, body);
      return adaptCommentToClient(data);
    } catch (error) {
      errorHandle(error);
      return Promise.reject(error);
    }
  });

export const postFavorite = createAsyncThunk<Offer, FavoriteAuth,{ extra: Extra }>(
  Action.POST_FAVORITE,
  async (id, { extra: { api, history } }) => {
    try {
      await api.post<OfferDTO>(`${ApiRoute.Favorite}/${id}`);
      const { data } = await api.get<OfferDTO>(`${ApiRoute.Offers}/${id}`);
      return adaptOfferToClient(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.BAD_REQUEST) {
        history.push(AppRoute.Login);
      }
      return Promise.reject(error);
    }
  });

export const deleteFavorite = createAsyncThunk<Offer, FavoriteAuth, { extra: Extra }>(
  Action.DELETE_FAVORITE,
  async (id, { extra: { api, history } }) => {
    try {
      await api.delete<OfferDTO>(`${ApiRoute.Favorite}/${id}`);
      const { data } = await api.get<OfferDTO>(`${ApiRoute.Offers}/${id}`);
      return adaptOfferToClient(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.BAD_REQUEST) {
        history.push(AppRoute.Login);
      }
      return Promise.reject(error);
    }
  });
